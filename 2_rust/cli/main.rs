use std::env;
use std::error::Error;
use request::blocking::Client;

fn main() -> Result<(), Box<dyn Error>> {
    let api_key = env::var(key:"RUSTY_WEATHER_API_KEY")
        .expect(msg:"Missing RUSTY_WEATHER_API_KEY")

    let args: Vec<String> = env::args().collect();
    if args.len() != 3 {
        eprintln!("Usage: weather_cli <latitude> <longitude>");
        std::process::exit(1);
    }

    let lat = &args[1];
    let lon = &args[2];

    let client = Client::new();
   
    let url = format!(
        "https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}&units=metric",
        lat, lon, api_key
    );

    println!("Debug: {} || {}", lat, lon);
    Ok(())
}
