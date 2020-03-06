CREATE TABLE trait(
    id              SERIAL PRIMARY KEY,
    "traitType"     VARCHAR(64) NOT NULL,
    "traitValue"    VARCHAR(64) NOT NULL
);