# React/Leaflet Mapping Template - FastAPI Backend

This is a template for a basic mapping web app written in react, that utilizes a FastAPI backend (Python).

The API and Web Application are containerized and orchestrated with `docker-compose` and 

## Development

Run `docker-compose up --build` to launch the app and related services. By default it will run on `127.0.0.1:3000` and you can view in your local browser.

## General Notes - API POST

Example cURL request for posting new locations:

`curl --location --request POST '127.0.0.1:8000/add_location?name=Hartford&description=The%20hart%20fording%20the%20stream&lat=41.7658&lon=-72.6734'`