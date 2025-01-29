from faker import Faker
import pymysql
import random

db = pymysql.connections.Connection(
  user="",
  password="",
  database="",
  host="",
  port=3306
)

fake = Faker("es_ES")

cursor = db.cursor()

cursor.execute("""
  create table if not exists carrera (
    id_carrera int               not null auto_increment primary key,
    codigo varchar(10)           not null,
    nombre varchar(50)           not null,
    fecha_creacion date          not null,
    observaciones varchar(255)   not null
  );
""")

cursor.execute("""
  create table if not exists alumn (
    id_alumno int                not null auto_increment primary key,
    codigo varchar(10)           not null,
    apellidos varchar(50)        not null,
    nombres varchar(50)          not null,
    edad int                     not null,
    sexo varchar(10)             not null,
    peso float                   not null,
    talla float                  not null,
    color varchar(50)            not null,
    provincia varchar(50)        not null,
    fecha_ingreso date           not null,
    id_carrera int               not null,
    constraint alumn_carrera_id_carrera_fk
      foreign key (id_carrera) references carrera (id_carrera)
  );
""")


carreras = [
  "Medicina", "Derecho", "Ingeniería Civil", "Ingeniería Industrial", "Ingeniería Mecánica",
  "Ingeniería Eléctrica", "Ingeniería Electrónica", "Ingeniería de Sistemas", "Ingeniería Química",
  "Ingeniería Ambiental", "Arquitectura", "Psicología", "Administración de Empresas", "Contabilidad",
  "Economía", "Finanzas", "Marketing", "Comunicación Social", "Periodismo", "Diseño Gráfico",
  "Diseño Industrial", "Biología", "Química", "Física", "Matemáticas", "Estadística", "Geología",
  "Ingeniería de Minas", "Ingeniería Petrolera", "Ingeniería Agronómica", "Medicina Veterinaria",
  "Zootecnia", "Agronomía", "Enfermería", "Odontología", "Farmacia", "Nutrición y Dietética",
  "Trabajo Social", "Sociología", "Antropología", "Historia", "Filosofía", "Letras", "Lingüística",
  "Traducción e Interpretación", "Educación Infantil", "Educación Primaria", "Pedagogía",
  "Ingeniería en Telecomunicaciones", "Ingeniería en Informática", "Ingeniería en Software",
  "Ingeniería en Redes", "Ingeniería en Energías Renovables", "Ingeniería Biomédica",
  "Ingeniería en Alimentos", "Ciencias Políticas", "Relaciones Internacionales", "Derecho Internacional",
  "Criminología", "Ciencias de la Computación", "Inteligencia Artificial", "Ciberseguridad",
  "Diseño de Interiores", "Artes Plásticas", "Música", "Teatro", "Cine y Televisión",
  "Ingeniería en Sonido", "Ingeniería en Multimedia", "Ingeniería en Robótica", "Astronomía",
  "Astrofísica", "Oceanografía", "Meteorología", "Ecología", "Genética", "Microbiología",
  "Bioquímica", "Biomedicina", "Fisioterapia", "Terapia Ocupacional", "Logopedia",
  "Ingeniería en Transporte", "Ingeniería en Logística", "Ingeniería en Producción",
  "Ingeniería en Textiles", "Ingeniería en Materiales", "Ingeniería en Nanotecnología",
  "Ingeniería en Mecatrónica", "Ingeniería en Automatización", "Ingeniería en Control",
  "Ingeniería en Geología", "Ingeniería en Geofísica", "Ingeniería en Topografía",
  "Ingeniería en Acuicultura", "Ingeniería en Pesca", "Ingeniería en Forestales",
  "Ingeniería en Horticultura", "Ingeniería en Turismo", "Gastronomía"
]

for carrera in carreras:
  codigo = fake.bothify(text='???-###', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  fecha_creacion = fake.date_time_between(start_date="-200y", end_date="now")
  observaciones = fake.sentence(nb_words=10)

  cursor.execute("""
    INSERT INTO carrera (codigo, nombre, fecha_creacion, observaciones) VALUES (%s, %s, %s, %s);
  """, (codigo, carrera, fecha_creacion, observaciones))
  db.commit()


departamentos_peru = [
  "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", 
  "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", 
  "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", 
  "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
]

colors = [
  "azul", "blanco", "amarillo", "rojo", "verde", "naranja", "marrón", "gris", "amarillo claro"
]

# (codigo, apellidos, nombres, edad, sexo, peso, talla, color, provincia, fecha_ingreso, id_carrera)

for i in range(1, 100000 + 1):
  codigo = fake.numerify('########')
  last_name = fake.last_name()
  name = fake.first_name()
  edad = fake.random_int(min=16, max=70)
  sexo = fake.random_element(["masculino", "femenino"])
  peso = fake.random_int(min=50, max=200)
  talla = random.uniform(1.0, 2.0)
  color = fake.random_element(colors)
  provincia = fake.random_element(departamentos_peru)
  fecha_ingreso = fake.date_time_between(start_date="-20y", end_date="now")
  id_carrera = random.randint(1, len(carreras))
  cursor.execute("""
    INSERT INTO alumn (codigo, apellidos, nombres, edad, sexo, peso, talla, color, provincia, fecha_ingreso, id_carrera) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
  """, (codigo, last_name, name, edad, sexo, peso, talla, color, provincia, fecha_ingreso, id_carrera))
  db.commit()
