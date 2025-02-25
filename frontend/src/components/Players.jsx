import React, { useState } from "react";

const playersList = [
    "सुभंकर कुमार दास", "प्रदीप कुमार दास", "संजय कुमार झा", "राजेश कुमार मिश्र", "राकेश भूo प्रसाद",
    "रविशंकर घोष", "अनुज भूo प्रसाद", "उत्तम कुमार झा", "संदीप कुमार दास", "नेहरू कुमार घोष",
    "धनंजय कुमार घोष", "पंकज कुमार मिश्र", "मुकेश कुमार झा", "मृत्युञ्जय कुमार झा", "विकाश कुमार झा",
    "रितेश कुमार झा", "संतोष कुमार घोष", "पवन कुमार झा", "मुकेश कुमार झा (2)", "विपुल कुमार घोष",
    "नितेश कुमार दास", "कमलेश कुमार झा", "आशुतोष कुमार मिश्र", "बिट्टू कुमार झा", "अजित कुमार झा",
    "सिपुल कुमार घोष", "अनुज कुमार दास", "सौरव कुमार दास", "कुशकांत झा", "लवकांत झा",
    "राजा कुमार झा", "मनीष कुमार मिश्र", "सुयश कुमार झा", "अंकित कुमार झा", "सौरव कुमार चौधरी",
    "राहुल कुमार मिश्र", "अंशु कुमार घोष", "अंकित कुमार झा (2)", "सूरज कुमार झा", "प्रणब कुमार झा"
];

const Players = () => {
    const [search, setSearch] = useState("");
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const toggleSelect = (player) => {
        if (selectedPlayers.includes(player)) {
            setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
        } else {
            setSelectedPlayers([...selectedPlayers, player]);
        }
    };

    const filteredPlayers = playersList.filter((player) =>
        player.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="container mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-5">
                    🏆 27वाँ टी.सी.सी कप कसबा 2025 🏆
                </h1>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="🔍 खिलाड़ियों को खोजें..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPlayers.map((player, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded-lg cursor-pointer transition ${
                                selectedPlayers.includes(player)
                                    ? "bg-indigo-500 text-white"
                                    : "bg-white hover:bg-indigo-100"
                            }`}
                            onClick={() => toggleSelect(player)}
                        >
                            <span className="font-medium">{index + 1}. {player}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-center text-green-600">✅ चयनित खिलाड़ी:</h2>
                    {selectedPlayers.length > 0 ? (
                        <ul className="list-disc list-inside mt-2">
                            {selectedPlayers.map((player, index) => (
                                <li key={index}>{player}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 mt-2">कोई खिलाड़ी चयनित नहीं है।</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Players;
