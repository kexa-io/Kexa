# checkinfra
### develop
run this on a linux environement.

install nodejs
<code>curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs</code>
install npm
<code>npm install</code>

git clone the repository
<code>git clone git@github.com:4urcloud/checkinfra.git</code>

add variable to check the subscription azure.
<code>SUBSCRIPTIONID=xxx-xxxx-xxxxx-xxxxxx</code>

to exec the nodemon and develop run
<code>npm run start:dev</code>