#<ins>**Project Description**</ins>
  This project is about a static web page which fetches data using api calls from a movie database and showing results based on the search key word and deploying the website using docker.__ 
#<ins>**Docker deployment**</ins>
    Steps for docker deployment
    ##**1.Dockerfile creation**
            for this project i used nginx light weight webserver as the base image.
                FROM  nginx:alpine
            copying the contents of the static web page files  to the nginx default directory
                COPY . /usr/share/nginx/html
            port number is mentioned through which the website is accessed.
                EXPOSE 80
    ##**2.Building the Docker image**
            docker build -t myapp .
              here myapp is the image name.
    ##**3.Running the docker container**
            docker run -d -p 8080:80 myapp
              -d is for running the container in detached mode
              -p is for mapping the host and container port numbers
              here myapp is the created image name
    ##**4.accessing the website**
            open the link below in the web browser for opening locally
              http://localhost:8080 
