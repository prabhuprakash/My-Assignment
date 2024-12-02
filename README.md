<ins>**Project Description**</ins><br/>
  This project is about a static web page which fetches data using api calls from a movie database and showing results based on the search key word and deploying the website using docker.<br/>
<ins>**Docker deployment**</ins><br/>
    Steps for docker deployment<br/><br/>
      <ins>**1.Dockerfile creation**</ins><br/>
            for this project i used nginx light weight webserver as the base image.<br/><br/>
                FROM  nginx:alpine<br/><br/>
            copying the contents of the static web page files  to the nginx default directory<br/><br/>
                COPY . /usr/share/nginx/html<br/><br/>
            port number is mentioned through which the website is accessed.<br/>
                EXPOSE 80<br/>
      <ins>**2.Building the Docker image**</ins><br/><br/>
            docker build -t myapp .<br/><br/>
              here myapp is the image name.<br/>
      <ins>**3.Running the docker container**</ins><br/><br/>
            docker run -d -p 8080:80 myapp<br/><br/>
              -d is for running the container in detached mode<br/>
              -p is for mapping the host and container port numbers<br/>
              here myapp is the created image name<br/>
      <ins>**4.accessing the website**</ins><br/>
            open the link below in the web browser for opening locally<br/><br/>
              http://localhost:8080 <br/>
