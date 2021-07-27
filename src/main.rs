use crate::rusty_socket::rusty_socket;
use crate::weather_api::weather_api;
use std::env;

use std::net::TcpListener;
mod rusty_socket;
mod weather_api;
fn main() {
    let socket = rusty_socket();
    let args: Vec<String> = env::args().collect();
    println!("{:?}", weather_api());

    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    for stream in listener.incoming() {
        let stream = stream.unwrap();
        println!("Connection established!");
    }
}
