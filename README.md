# k6-npm-webpack
## Installation

### Linux

Debian/Ubuntu
```
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```
Fedora/CentOS

Using `dnf` (or `yum` on older versions):
```
sudo dnf install https://dl.k6.io/rpm/repo.rpm
sudo dnf install k6
```

### MacOS

Using Homebrew:
```
$ brew install k6
```

##
You can install the dependencies for this project with:
```
$ yarn install
```

## Running the test
To run a test we first have to bundle the project
```
$ yarn webpack
```
This command creates the final test files to the `./dist` folder.

Once that is done, we can run our script located in the `./dist` folder. 

Run the test with default configuration file 
```
$ k6 run -c config.json dist/user_info.test.js 
```

You can also run all the test at once since we need to test all the scenario. Although k6 doesn't provide the command for that, since we use webpack to bundle the project to `./dist` folder, we can use this command:
```
$ for FILE in dist/*.js; do k6 run -c config.json -o $FILE; done
```

## Writing own tests
House rules for writing tests:

The test code is located in `src/tests/` folder
The entry points for the tests need to have "test" word in the name to distinguish them from auxiliary files.
If static files are required then add them to `./assets` folder. Its content gets copied to the destination folder (`dist`) along with compiled scripts.

This project uses Babel and Webpack to bundle the different files - using the configuration of the `webpack.config.js` file.
