exec {'Eliminar Contenedores':
  command => "/bin/bash -c 'docker rm -f practica2'",
}
exec {'Levantar_Contenedor':
  command => "/bin/bash -c 'docker run --name practica2 -d -p 4200:4200 edson2021/corto1_201701029:latest'",
}
