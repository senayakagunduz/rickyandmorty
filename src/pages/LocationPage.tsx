import { useEffect, useState } from "react";
import { LocationType } from "../interface/Location";
import { getLocations } from "../service/location-service";
import { Link } from "react-router-dom";


const LocationPage: React.FC = () => {
    const [locationDatas, setLocationDatas] = useState<LocationType[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [showData, setShowData] = useState<boolean>(true)


    const handleLocationClick = (location: LocationType) => {
        setSelectedLocation(location);
    }

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    }
    const loadData = async () => {
        try {
            const getAllLocations = await getLocations()
            setLocationDatas(getAllLocations.results);
        } catch (error) {
            console.log("Error fetching locations", error)
        }
    }

    console.log(locationDatas, "locationDatas")
    useEffect(() => {
        loadData();
    }, [])

    return (
        <div className="location-container">
            <ul>
                {showData && locationDatas.map((item: LocationType) => (
                    <li key={item.id}>
                        <span onClick={() => handleLocationClick(item)}>{item.name}</span>
                        {selectedLocation && selectedLocation.id === item.id && (
                            <ul>
                                <li>
                                    <Link to={`/location/${item.id}`} className="toggle-btn" style={{ fontWeight: "300" }}>Click to see the characters in this location</Link>
                                </li>
                                <li>
                                    <button className="toggle-btn" onClick={toggleInfo} style={{ fontWeight: "300" }}>Location Details</button>
                                    {showInfo && (
                                        <ul>
                                            <li><span>Name: </span>{item.name}</li>
                                            <li><span>Type: </span>{item.type}</li>
                                            <li><span>Dimension: </span>{item.dimension}</li>
                                            <li><span>Resident Count: </span>{item.residents.length}</li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        
    )
}
export default LocationPage

