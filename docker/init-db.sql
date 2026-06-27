-- Runs once on first container start.
-- The 'clean' database is already created by POSTGRES_DB in docker-compose.
-- Create the additional database for the license service.
CREATE DATABASE stratroomlicense;
