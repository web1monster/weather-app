import { Input } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from "./card"

export default function Search() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [weather, setWeather] = useState([]);
    const [isData, setData] = useState(false);

    const handleClick = () => {
        const err = axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=f7dd5f65195d863069e051cef5e0e2ec&units=imperial`
            )
            .then((res) => {
                setWeather(res.data);
                console.log(res.data);
                setData(true);
            })
            .catch((err) => {
                err;
                setData(false);
            });
    };

    return (
        <>
            <Container padding="10px" width="100vw">
                <Flex>
                    <Input
                        placeholder="Enter Your City"
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                    <IconButton
                        colorScheme="blue"
                        aria-label="Search database"
                        icon={<SearchIcon />}
                        onClick={handleClick}
                    />
                </Flex>
            </Container>
            //Conditional rendering
            {isData? <Card value={weather} /> : <div> oops no value </div>}
        </>
    )
}