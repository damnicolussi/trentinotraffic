import requests
import pandas as pd

webcam_url = "https://vit.trilogis.it/json/webcam"

def to_timestamp(ts):
    months = {
        'gennaio': '01',
        'febbraio': '02',
        'marzo': '03',
        'aprile': '04',
        'maggio': '05',
        'giugno': '06',
        'luglio': '07',
        'agosto': '08',
        'settembre': '09',
        'ottobre': '10',
        'novembre': '11',
        'dicembre': "12"
    }
    data = ts.split(",")[1].split(" ")
    day = data[1]
    month = months[data[2]]
    year = data[3]
    hour = data[4]
    timestamp = year + "-" + month + "-" + day + " " + hour + ",0"
    return timestamp

def get_webcams():
    webcams = requests.get(webcam_url).json()['webcams']['webcam']
    
    webcams_df = pd.DataFrame(webcams)

    webcams_df['Id'] = webcams_df['Id'].astype(int)
    webcams_df['Cod'] = webcams_df['Cod'].astype(int)
    webcams_df['Nome'] = webcams_df['Nome'].astype(str)
    webcams_df['Direzione'] = webcams_df['Direzione'].astype(str)
    webcams_df['Url_Immagine'] = webcams_df['Url_Immagine'].astype(str)
    webcams_df['IP_Webcam'] = webcams_df['IP_Webcam'].astype(str)
    webcams_df['Km'] = webcams_df['Km'].astype(str)
    webcams_df['Strada'] = webcams_df['Strada'].astype(str)
    webcams_df['Localita'] = webcams_df['Localita'].astype(str)
    webcams_df['ZonaTN'] = webcams_df['ZonaTN'].astype(int)
    webcams_df['Lat'] = webcams_df['Lat'].apply(lambda x: float(x) if x!='' else 0)
    webcams_df['Lng'] = webcams_df['Lng'].apply(lambda x: float(x) if x!='' else 0)
    webcams_df['Monitoraggio'] = webcams_df['Monitoraggio'].astype(bool)
    webcams_df['Live'] = webcams_df['Live'].astype(bool)
    webcams_df['TS_Image'] = webcams_df['TS_Image'].astype(str)

    webcams_df = webcams_df[webcams_df['Url_Immagine'] != 'http://vit.trilogis.it/cam/webcam_outdated.jpg']
    webcams_df['timestamp'] = webcams_df['TS_Image'].apply(lambda x: to_timestamp(x))
    webcams_df['timestamp'] = pd.to_datetime(webcams_df.timestamp, format='%Y-%m-%d %H:%M:%S,%f')

    columns = {
    'Id':'id','Cod':'codice',"Nome":'nome',
    'Direzione':'direzione','Url_Immagine':'url',
    'Attiva': 'attiva',
    'Comune':'comune','Comunita':'comunita_valle',
    'IP_Webcam':'ip_webcam','Km':'km','Strada':'strada',
    'Localita':'localita','ZonaTN':'zona_tn', 'Lat':'latitudine',
    'Lng':'longitude','Monitoraggio':'monitoraggio',
    'Live':'live','TS_Image':'data'}

    webcams_df.rename(columns=columns, inplace=True)

    del webcams_df['data']
    del webcams_df['ip_webcam']
    del webcams_df['monitoraggio']
    del webcams_df['live']
    del webcams_df['attiva']
    del webcams_df['zona_tn']
    
    webcams_list = list(webcams_df["url"])

    return webcams_df, webcams_list

def download_webcams(webcams):
    for url in webcams:
        path = "tt-website/public/webcams/"
        filename = url.replace("http://vit.trilogis.it/cam/", "")

        r = requests.get(url)
        if r.status_code == 200:
            with open((path + filename), 'wb') as f:
                f.write(r.content)
        else:
            print("Error downloading webcam " + url)