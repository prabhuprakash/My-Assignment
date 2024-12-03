<ins>**Docker deployment**</ins><br/>
      <ins>**1.Dockerfile creation**</ins><br/>
            FROM  nginx:alpine<br/><br/>
            COPY . /usr/share/nginx/html<br/><br/>
            EXPOSE 80<br/>
      <ins>**2.Building the Docker image**</ins><br/><br/>
            docker build -t myapp .<br/><br/>
      <ins>**3.Running the docker container**</ins><br/><br/>
            docker run -d -p 8080:80 myapp<br/><br/>
      <ins>**4.accessing the website**</ins><br/>
            http://localhost:8080 <br/>
           
            https://cors-anywhere.herokuapp.com/corsdemo
