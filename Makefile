all: up

up:
	docker compose up -d --build

down:
	docker compose down

clean:
	docker compose down --volumes --rmi all	

re: down clean up

phony: up down clean re