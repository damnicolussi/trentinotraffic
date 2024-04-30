import calendar
import datetime
import time

import util.previous as previous

def save_data(webcams):
    webcams.to_csv("trentinotraffic_data.csv", index=False)
    to_ts_array(webcams)

    vehicles = count_vehicles(webcams)
    save_analytics(vehicles)
    
def to_ts_array(webcams):
    id = list(webcams["id"])
    cod = list(webcams["codice"])
    nome = list(webcams["nome"])
    direzione = list(webcams["direzione"])
    url = list(webcams["url"])
    comune = list(webcams["comune"])
    comunita_valle = list(webcams["comunita_valle"])
    km = list(webcams["km"])
    strada = list(webcams["strada"])
    localita = list(webcams["localita"])
    latitudine = list(webcams["latitudine"])
    longitude = list(webcams["longitude"])
    timestamp = list(webcams["timestamp"])
    veicoli = list(webcams["veicoli"])

    file = open("tt-website/src/pages/webcams/WebcamList.ts", "w")
    file.write("export const ListOfWebcams = [\n")

    for i in range(len(id)):
        file.write(f'[{id[i]}, {cod[i]}, "{nome[i]}", "{direzione[i]}", "{url[i]}", "{comune[i]}", "{comunita_valle[i]}", "{km[i]}", "{strada[i]}", "{localita[i]}", {latitudine[i]}, {longitude[i]}, "{timestamp[i]}", {veicoli[i]}],\n')

    file.write("]")

    last_update()

def last_update():
    update = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    ts = calendar.timegm(time.gmtime())
    file = open("tt-website/src/pages/webcams/LastUpdate.ts", "w")
    file.write(f'export const LastUpdate = "{update}"')
    file.write(f'\nexport const LastUpdateTS = {ts}')

def count_vehicles(webcams):
    veicoli = list(webcams["veicoli"])
    total = 0

    for v in veicoli:
        total += int(v)

    return total

def save_analytics(vehicles):
    dt = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    date = dt.split(" ")[0]
    time = dt.split(" ")[1]

    day = int(date.split("/")[0])
    month = int(date.split("/")[1])
    year = int(date.split("/")[2])
    week = datetime.datetime(year, month, day).isocalendar()[1]
    day_of_week = datetime.datetime.now().weekday()
    hour = int(time.split(":")[0])

    if previous.day != day:
        previous.hour_vehicles = [0] * 24
    previous.hour_vehicles[hour] += vehicles

    if previous.week != week:
        previous.day_vehicles = [0] * 7
    previous.day_vehicles[day_of_week] += vehicles

    if previous.year != year:
        previous.month_vehicles = [0] * 12
    previous.month_vehicles[month - 1] += vehicles

    if previous.year != year:
        previous.index_y += 1
        previous.year_label.append(year)
    previous.year_vehicles[previous.index_y] += vehicles

    file = open("util/previous.py", "w")
    file.write(f'day = {day}\nweek = {week}\nyear = {year}\nindex_y = {previous.index_y}\n\n')
    file.write(f'hour_vehicles = {previous.hour_vehicles}\nday_vehicles = {previous.day_vehicles}\nmonth_vehicles = {previous.month_vehicles}\nyear_vehicles = {previous.year_vehicles}\nyear_label = {previous.year_label}')

    website = open("tt-website/src/pages/data/ChartData.ts", "w")
    website.write(f"const data_hour = {previous.hour_vehicles}\nconst data_day = {previous.day_vehicles}\nconst data_month = {previous.month_vehicles}\nconst data_year = {previous.year_vehicles}\n\n")
    website.write("const labels_hour = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']\n"
                  "const labels_day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']\n"
                  "const labels_month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']\n"
                  f"const labels_year = {list(map(str, previous.year_label))}\n\n"
                  "export const data = {\n"
                  "   hour: data_hour,\n"
                  "   day: data_day,\n"
                  "   month: data_month,\n"
                  "   year: data_year,\n"
                  "}\n"
                  "\n"
                  "export const labels = {\n"
                  "    hour: labels_hour,\n"
                  "    day: labels_day,\n"
                  "    month: labels_month,\n"
                  "    year: labels_year,\n"
                  "}")
