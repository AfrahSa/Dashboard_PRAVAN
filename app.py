from flask import Flask, render_template, request
from flask import redirect
from flask import jsonify
import json


from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3306
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass_root'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university'

mysql.init_app(app)


app = Flask(__name__)


@app.route('/')
def index():
	return render_template('index.html')
	
@app.route('/api/data')
def doGetData():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select annee, count(*) AS NbEtudiant from resultats group by annee;")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)
	
	
@app.route('/api/data2')
def doGetData2():
	
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	specialite_tuple = cursor.fetchall()
	specialite_list =  [item[0] for item in specialite_tuple]
	
	for specialite in specialite_list:
		cursor.execute("SELECT count(*) AS NbEtudiant from resultats where specialite='"+specialite+"' group by annee")	
		nbEtud_tuple = cursor.fetchall()
		nbEtud_list =  [item[0] for item in nbEtud_tuple]
		data["datasets"].append({"label":specialite, "data":nbEtud_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 	

@app.route('/api/data3')
def doGetData3():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee,AVG(moyenne) AS moyenneEtd from resultats group by annee;")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)

@app.route('/api/data4')
def doGetData4():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT specialite,count(*) AS NbEtudiant from resultats where annee=2021 group by specialite;")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


@app.route('/api/data5')
def doGetData5():
	
 data = {"years":[], "dataF":[], "dataH":[]}
	
 conn = mysql.connect()	
 cursor =conn.cursor()	
 cursor.execute("SELECT DISTINCT annee FROM resultats")	
 years_tuple = cursor.fetchall()
 years_list =  [item[0] for item in years_tuple]
 data["years"]=years_list	
	
 cursor.execute(" select count(*) AS nombre from resultats where sexe='F' group by annee")	
 
 moyEtud_tuple = cursor.fetchall()
 moyEtud_list =  [item[0] for item in moyEtud_tuple]
 data["dataF"]=moyEtud_list 
 cursor.execute(" select count(*) AS nombre from resultats where sexe='H' group by annee")	
 
 moyEtud_tuple = cursor.fetchall()
 moyEtud_list =  [item[0] for item in moyEtud_tuple]
 data["dataH"]=moyEtud_list
 data_JSON = json.dumps(data)	
 return data_JSON 	
	
if __name__ == '__main__':
	app.run(debug=True, port=5000)
	
	