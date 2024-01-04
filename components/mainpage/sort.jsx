import React, { useState, useEffect } from 'react'
import { getCountries } from '@/lib/countries'
import RadioInput from '@/components/ui/radio-input'
import { useMainContext } from '@/lib/maincontext'

const Sort = ({ filterDatasHandler }) => {
    const [countries, setCountries] = useState([]);
    const [filterOpened, setFilterOpened] = useState(false);

    const { filteredCountry, setFilteredCountry, filteredTime, setFilteredTime, filteredType, setFilteredType, filteredDifficulity, setFilteredDifficulity } = useMainContext();

    useEffect(() => {
        const filterData = () => {
            filterDatasHandler([filteredCountry, filteredTime, filteredType, filteredDifficulity]);
        }
        filterData();
    }, [filteredCountry, filteredTime, filteredType, filteredDifficulity]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesData = await getCountries();
                const sortedData = countriesData.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(sortedData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const filterOpenToggle = () => {
        setFilterOpened(!filterOpened);
    }

    const clearFilter = () => {
        setFilteredCountry("");
        setFilteredTime("");
        setFilteredType("");
        setFilteredDifficulity("");
    }

    return (
        <>
            <div className={`lg:hidden bg-white rounded-full ${filterOpened ? "hidden" : "fixed"} top-24 z-[9997] flex flex-col items-center justify-center gap-2 cursor-pointer`} onClick={filterOpenToggle}>
                <div className='bg-white border-2 border-black p-1 rounded-xl'>Filter</div>
            </div>
            <article className={`fixed z-[999] lg:static top-1/2 left-1/2 transform ${filterOpened ? "-translate-x-1/2" : "-translate-x-[2000px]"} -translate-y-1/2 lg:translate-x-0 lg:translate-y-0 w-[90%] lg:w-[30%] flex flex-col items-start justify-end lg:justify-center rounded-xl border-2 border-white p-4 bg-gradient-to-b from-[#FFFAFA] via-white  to-[#FFFAFA] shadow-lg hover:border-gray-400 transition-all duration-300`}>
                <div>
                    <div className='flex flex-col gap-5 text-xl relative'>
                        <h1 className='lg:text-2xl xl:text-4xl font-bold'>Filter the foods</h1>
                        <button onClick={clearFilter}>Clear the filter</button>
                        <div>
                            <p className='lg:text-xl xl:text-2xl font-bold'>Nationality</p>
                            <select onChange={e => setFilteredCountry(e.target.value === "all" ? "" : e.target.value)} className='text-sm p-2 w-28 lg:w-32 xl:w-full rounded-lg focus:outline-none active:outline-none border-b-2 border-gray-300'>
                                <option value="all">All</option>
                                {countries && countries?.map((country, index) => (
                                    <option key={index} value={country.name.common}>
                                        {country.name.common}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='lg:text-xl xl:text-2xl font-bold'>Time</p>
                            <RadioInput setInputValue={setFilteredTime} name='time' value='>1h' label='>1h' id=">1h" />
                            <RadioInput setInputValue={setFilteredTime} name='time' value='1h-2h' label='1h-2h' id="1h-2h" />
                            <RadioInput setInputValue={setFilteredTime} name='time' value='2h<' label='2h<' id="2h<" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='lg:text-xl xl:text-2xl font-bold'>Type</p>
                            <RadioInput setInputValue={setFilteredType} name='type' value='breakfast' label='Breakfast' id="breakfast" />
                            <RadioInput setInputValue={setFilteredType} name='type' value='lunch' label='Lunch' id="lunch" />
                            <RadioInput setInputValue={setFilteredType} name='type' value='dinner' label='Dinner' id="dinner" />
                            <RadioInput setInputValue={setFilteredType} name='type' value='dessert' label='Dessert' id="dessert" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='lg:text-xl xl:text-2xl font-bold'>Difficulity</p>
                            <RadioInput setInputValue={setFilteredDifficulity} name='difficulity' value='Reallyeasy' label='Really easy' id="Reallyeasy" />
                            <RadioInput setInputValue={setFilteredDifficulity} name='difficulity' value='Easy' label='Easy' id="Easy" />
                            <RadioInput setInputValue={setFilteredDifficulity} name='difficulity' value='Medium' label='Medium' id="Medium" />
                            <RadioInput setInputValue={setFilteredDifficulity} name='difficulity' value='Hard' label='Hard' id="Hard" />
                        </div>
                    </div>
                    <div onClick={filterOpenToggle} className={`p-2 absolute lg:hidden top-5 right-5 text-2xl font-bold`}>
                        X
                    </div>
                </div>
            </article>
        </>
    )
}

export default Sort;