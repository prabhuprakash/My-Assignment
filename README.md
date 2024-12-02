#<ins>**Project Description**</ins><br/>
  This project is about a static web page which fetches data using api calls from a movie database and showing results based on the search key word and deploying the website using docker.<br/>
#<ins>**Docker deployment**</ins><br/>
    Steps for docker deployment<br/>
    ##**1.Dockerfile creation**<br/>
            for this project i used nginx light weight webserver as the base image.<br/>
                FROM  nginx:alpine<br/>
            copying the contents of the static web page files  to the nginx default directory<br/>
                COPY . /usr/share/nginx/html<br/>
            port number is mentioned through which the website is accessed.<br/>
                EXPOSE 80<br/>
    ##**2.Building the Docker image**<br/>
            docker build -t myapp .<br/>
              here myapp is the image name.<br/>
    ##**3.Running the docker container**<br/>
            docker run -d -p 8080:80 myapp<br/>
              -d is for running the container in detached mode<br/>
              -p is for mapping the host and container port numbers<br/>
              here myapp is the created image name<br/>
    ##**4.accessing the website**<br/>
            open the link below in the web browser for opening locally<br/>
              http://localhost:8080 <br/>
