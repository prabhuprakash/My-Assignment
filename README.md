Static Web Page with Movie Database API and Docker Deployment
This project involves creating a static web page that:

Fetches data using API calls from a movie database.
Displays results based on a search keyword.
Is deployed using Docker for efficient hosting.
Docker Deployment
Steps for Docker Deployment
1. Dockerfile Creation
For this project, we use the lightweight Nginx web server as the base image.

dockerfile
Copy code
FROM nginx:alpine
# Copying the contents of the static web page files to the Nginx default directory
COPY . /usr/share/nginx/html
# Specifying the port through which the website is accessed
EXPOSE 80
2. Building the Docker Image
Use the following command to build the Docker image:

bash
Copy code
docker build -t myapp .
Here, myapp is the name of the Docker image.

3. Running the Docker Container
Run the container using the built image:

bash
Copy code
docker run -d -p 8080:80 myapp
-d: Runs the container in detached mode.
-p: Maps the host and container port numbers.
Here, myapp is the name of the Docker image.

4. Accessing the Website
Open the following link in your web browser to access the website locally:

http://localhost:8080

