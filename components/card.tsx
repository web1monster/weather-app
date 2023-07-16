import {
    Flex,
    Text,
    Image,
    Box,
    SimpleGrid,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";

const Card = (props: any) => {
    const data = props.value; //stores props values in data
    const weatherItems = data.weather; //gets the values of weather
    const cityName = data.name;
    const cityMain = data.main;
    const weatherForecast = data.main.feels_like;
    const weatherIcon = Object.values(weatherItems)
        .map((itm: any) => itm.icon)
        .join("");
    const url = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    //date and time
    const dT = data.dt;
    const time = data.timezone;
    const cityMonth = new Date(dT * 1000 + time * 1000).getMonth();
    const cityTime = new Date(dT * 1000 + time * 1000).getDay();
    const minutes = new Date(dT * 1000 + time * 1000).getMinutes();
    const hours = new Date(dT * 1000 + time * 1000).getHours();
    const cityDate = new Date(dT * 1000 + time * 1000).getDate();
    const cityMinutes = minutes < 10 ? `0${minutes.toString()}` : minutes.toString();
    const cityHours = hours < 10 ? `0${hours.toString()}` : hours.toString();
    const timeFormat = parseInt(cityHours) >= 12 ? "PM" : "AM";
    const mainTime = `${cityHours}:${cityMinutes} ${timeFormat}`;
    let val;
    const dayArray = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const day = dayArray[cityTime];
    const monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = monthArray[cityMonth];
    let tempName: any = [];
    let tempValue: any = [];
    let dateSuffix;
    switch (cityDate) {
        case 2:
            dateSuffix = "nd";
            break;
        case 3:
            dateSuffix = "rd";
            break;
        default:
            dateSuffix = "th";
    }
    const fullDate = `${month} ${day} ${cityDate + dateSuffix}`;
    const unicode = "\u00b0";
    //actual data array
    let weatherArray = [fullDate, cityName, mainTime];
    //weather key names
    Object.keys(cityMain)
        .filter((val, index) => index != 1)
        .map((key) => {
            tempName.push(key);
        });
    //weather value numbers
    Object.values(cityMain)
        .filter((val, index) => index != 1)
        .map((val) => {
            tempValue.push(val);
        });

    //main weather key name and value to display
    let mainTemp = tempName.map((val: any, index: any) => {
        return `${val} : ${tempValue[index]}`;
    });

    return (
        <SimpleGrid columns={2} minChildWidth="500px" placeItems="center" spacing={16}>
            <Box
                m="10px"
                h="500px"
                w="400px"
                mt="40px"
                bgImage="url(./img/cloudy.jpg)"
                bgPosition="bottom"
                borderRadius="2xl"
                shadow="dark-lg"
            >
                {weatherArray.map((element, index) => (
                    <UnorderedList>
                        <ListItem
                            color="white"
                            display="flex"
                            justifyContent="center"
                            mt="20px"
                            key={index}
                        >
                            {element}
                        </ListItem>
                    </UnorderedList>
                ))}
                <Image
                    src={url}
                    alt="weather-icon"
                    width={100}
                    height={100}
                    ml="155"
                    p="0"
                />
                <Text
                    color="white"
                    display="flex"
                    justifyContent="center"
                    mt="5px"
                    fontSize="20px"
                >
                    {weatherForecast}
                    {unicode}
                </Text>
                <Text color="white" display="flex" justifyContent="center" mt="200px">
                    {" "}
                    Current Weather{" "}
                </Text>
            </Box>

            <Box
                m="10px"
                h="500px"
                w="400px"
                mt="40px"
                bgImage="url(./img/sunshine.jpg)"
                bgPosition="center"
                borderRadius="2xl"
                shadow="dark-lg"
            >
                <Flex wrap="wrap" gap="2" justifyContent="space-around">
                    {mainTemp.map((val: any, index: any) => (
                        <Box
                            color="white"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            p="5"
                            w="150px"
                            key={index}
                        >
                            {" "}
                            {val}{" "}
                        </Box>
                    ))}
                </Flex>
            </Box>
        </SimpleGrid>
    )
}

export default Card;