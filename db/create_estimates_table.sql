CREATE TABLE Estimates (
estimate_id SERIAL PRIMARY KEY,
cusotmer_id INTEGER REFERENCES Customers (customer_id),
items JSONB ARRAY
)