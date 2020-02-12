#!/bin/bash

if [ "$DB_USER" ] &&[ "$DB_PASSWORD" ]; then
    "${mongo[@]}" "$DB_NAME" <<-EOJS
	db.createUser({
		user: $(_js_escape "$DB_USER"),
		pwd: $(_js_escape "$DB_PASSWORD"),
		roles: [ "readWrite", "dbAdmin" ],
	})
	EOJS
fi