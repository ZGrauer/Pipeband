# ![Kansas City St Andrew Pipes and Drums logo](./src/assets/band_logo.webp)  

An Angular web app (generated with [Angular CLI](https://github.com/angular/angular-cli) v15.0.1) for the [Kansas City St Andrew Pipes and Drums](https://www.kcpipeband.org/) band.  Resources for fans, prospetive students, and current members.

---

## Installation

1) Follow the [Angular setup guide](https://angular.io/guide/setup-local) to configure your local environment and workspace
2) Clone this project to your local machine

## Development Server Using Angular CLI

In the project directory open a new terminal and run `ng serve` for a dev server. This will build the code and start the server. Navigate to `http://localhost:4200/` to view the site. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build Locally Using Angular CLI

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. These files can be deployed to a hosting provider to run in production.

## Build and Run via Docker

Open a terminal in the project directory and run `docker build -t pipeband-image .` to build the docker image.

```shell
> docker build -t pipeband-image .
[+] Building 154.5s (17/17) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                                                                                                                                                             0.0s 
 => => transferring dockerfile: 356B                                                                                                                                                                                                                                                             0.0s 
 => [internal] load .dockerignore                                                                                                                                                                                                                                                                0.0s 
 => => transferring context: 2B                                                                                                                                                                                                                                                                  0.0s 
 => [internal] load metadata for docker.io/library/nginx:alpine                                                                                                                                                                                                                                  0.5s 
 => [internal] load metadata for docker.io/library/node:16.15.0-alpine                                                                                                                                                                                                                           0.9s 
 => [auth] library/nginx:pull token for registry-1.docker.io                                                                                                                                                                                                                                     0.0s 
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                                                                                                                                                      0.0s 
 => [build 1/6] FROM docker.io/library/node:16.15.0-alpine@sha256:1a9a71ea86aad332aa7740316d4111ee1bd4e890df47d3b5eff3e5bded3b3d10                                                                                                                                                               2.1s 
 => => resolve docker.io/library/node:16.15.0-alpine@sha256:1a9a71ea86aad332aa7740316d4111ee1bd4e890df47d3b5eff3e5bded3b3d10                                                                                                                                                                     0.0s 
 => => sha256:1a9a71ea86aad332aa7740316d4111ee1bd4e890df47d3b5eff3e5bded3b3d10 1.43kB / 1.43kB                                                                                                                                                                                                   0.0s 
 => => sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb 1.16kB / 1.16kB                                                                                                                                                                                                   0.0s 
 => => sha256:e5065cc780745864eeee3280fe347b33e90961c98c7d3e14d5b660e16aef24ce 6.58kB / 6.58kB                                                                                                                                                                                                   0.0s 
 => => sha256:70c90f7de7cb2465ac0d6c9abd3fdb4cc099470a252ef71349c8f2e3bab8acab 35.54MB / 35.54MB                                                                                                                                                                                                 0.7s 
 => => sha256:f83937c3ce37065db5f7e1d3a54289b0dceb4689c966f00d6d33d680dba32e02 2.34MB / 2.34MB                                                                                                                                                                                                   0.6s 
 => => sha256:98b78bba1d705582c099a16999d9e75b5874b2fa214dfeb2f047c910ad10a3de 451B / 451B                                                                                                                                                                                                       0.3s 
 => => extracting sha256:70c90f7de7cb2465ac0d6c9abd3fdb4cc099470a252ef71349c8f2e3bab8acab                                                                                                                                                                                                        0.9s 
 => => extracting sha256:f83937c3ce37065db5f7e1d3a54289b0dceb4689c966f00d6d33d680dba32e02                                                                                                                                                                                                        0.1s 
 => => extracting sha256:98b78bba1d705582c099a16999d9e75b5874b2fa214dfeb2f047c910ad10a3de                                                                                                                                                                                                        0.0s 
 => [internal] load build context                                                                                                                                                                                                                                                               84.1s 
 => => transferring context: 1.43GB                                                                                                                                                                                                                                                             84.0s 
 => [stage-1 1/3] FROM docker.io/library/nginx:alpine@sha256:6f94b7f4208b5d5391246c83a96246ca204f15eaf7e636cefda4e6348c8f6101                                                                                                                                                                    0.0s 
 => [build 3/6] COPY package.json package-lock.json ./                                                                                                                                                                                                                                           0.4s 
 => [build 4/6] RUN npm install                                                                                                                                                                                                                                                                 28.5s 
 => [build 5/6] COPY . .                                                                                                                                                                                                                                                                         5.2s 
 => [build 6/6] RUN npm run build                                                                                                                                                                                                                                                               35.2s 
 => CACHED [stage-1 2/3] COPY nginx.conf /etc/nginx/nginx.conf                                                                                                                                                                                                                                   0.0s 
 => [stage-1 3/3] COPY --from=build /usr/src/app/dist/pipeband /usr/share/nginx/html                                                                                                                                                                                                             0.0s 
 => exporting to image                                                                                                                                                                                                                                                                           0.0s 
 => => exporting layers                                                                                                                                                                                                                                                                          0.0s 
 => => writing image sha256:c9cf8b0910df4716df069c854f2bea183fb92239b01d24137e09d9f07efe0a50                                                                                                                                                                                                     0.0s 
 => => naming to docker.io/library/pipeband-image                                                                                                                                                                                                                                                0.0s 

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
```

Then run this command to start a container `docker run --name pipeband-container -d -p 8080:80 pipeband-image`.  The site should now be available at http://localhost:8080/.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
