import cv2
from ultralytics import YOLO
import pandas as pd
import numpy as np

import util.webcam as wb
import util.areas.areas as ar
import util.areas.check_area as ca
import util.save as save

model=YOLO('yolov8s.pt')

webcams_df, webcams_list = wb.get_webcams()
wb.download_webcams(webcams_list)

coco_list = open("coco.txt", "r").read().split("\n")
vehicles = ["car", "truck", "bus", "motorcycle", "train"]
min_confidence = {"car": 0.3, "truck": 0.3, "bus": 0.3, "motorcycle": 0.3, "train": 0.8}

for frame in webcams_list:
    vehicles_count = 0

    __path__ = "tt-website/public/webcams/"
    filename = frame.replace("http://vit.trilogis.it/cam/", "")
    frame = cv2.imread(__path__ + filename)
    
    try:
        cv2.resize(frame, (640, 480))
    except Exception as ex:
        pass

    results = model.predict(frame)

    data = results[0].boxes.data
    bb = pd.DataFrame(data).astype("float")

    try: 
        area = ar.area[filename]
    except Exception as ex:
        area = [(0, 0), (640, 0), (640, 480), (0, 480)]
    cv2.polylines(frame,[np.array(area,np.int32)],True,(255,0,0),2)

    for index, row in bb.iterrows():
        x1 = int(row[0])
        y1 = int(row[1])
        x2 = int(row[2])
        y2 = int(row[3])
        conf = float(row[4])
        class_list_id = int(row[5])
        name = coco_list[class_list_id]

        if any(vehicle in name for vehicle in vehicles) and conf > min_confidence[name]:
            cx = int(x1 + x2) // 2 
            cy = int(y1 + y2) // 2 

            if ca.check_inside(area, cx, cy):
                vehicles_count += 1
                
                data = f'{name} {conf:.2f}'
                (w, h), _ = cv2.getTextSize(data, cv2.FONT_HERSHEY_DUPLEX, 0.6, 1)
                cv2.rectangle(frame,(x1,y1),(x2,y2),(35,110,255),2)
                cv2.rectangle(frame, (x1, y1 - 20), (x1 + w, y1), (35,110,255), -1)
                cv2.putText(frame,str(data),(x1, y1-5),cv2.FONT_HERSHEY_DUPLEX,0.6,(255,255,255),1)

    webcams_df.loc[webcams_df['url'] == f"http://vit.trilogis.it/cam/{filename}", 'veicoli'] = vehicles_count
    
    try:
        cv2.imwrite(f'tt-website/public/webcams/{filename}', frame)
    except Exception as ex:
        pass

save.save_data(webcams_df)