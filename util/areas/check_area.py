import cv2
import numpy as np

def check_inside(area, cx, cy):
    result = cv2.pointPolygonTest(np.array(area, np.int32), ((cx, cy)), False)
    
    if result == 1:
        return True
    else:
        return False