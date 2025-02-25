import React, { useState } from "react";

// Player list with names and their corresponding Romanized versions for easy search.
const playersList = [
    { name: "सुभंकर कुमार दास", roman: "subhankar kumar das" },
    { name: "प्रदीप कुमार दास", roman: "pradeep kumar das" },
    { name: "संजय कुमार झा", roman: "sanjay kumar jha" },
    { name: "राजेश कुमार मिश्र", roman: "rajesh kumar mishra" },
    { name: "राकेश भूo प्रसाद", roman: "rakesh bhu prasad" },
    { name: "रविशंकर घोष", roman: "ravishankar ghosh" },
    { name: "अनुज भूo प्रसाद", roman: "anuj bhu prasad" },
    { name: "उत्तम कुमार झा", roman: "uttam kumar jha" },
    { name: "संदीप कुमार दास", roman: "sandeep kumar das" },
    { name: "नेहरू कुमार घोष", roman: "nehru kumar ghosh" },
    { name: "धनंजय कुमार घोष", roman: "dhananjay kumar ghosh" },
    { name: "पंकज कुमार मिश्र", roman: "pankaj kumar mishra" },
    { name: "मुकेश कुमार झा", roman: "mukesh kumar jha" },
    { name: "मृत्युञ्जय कुमार झा", roman: "mrityunjay kumar jha" },
    { name: "विकाश कुमार झा", roman: "vikash kumar jha" },
    { name: "रितेश कुमार झा", roman: "ritesh kumar jha" },
    { name: "संतोष कुमार घोष", roman: "santosh kumar ghosh" },
    { name: "पवन कुमार झा", roman: "pawan kumar jha" },
    { name: "मुकेश कुमार झा (2)", roman: "mukesh kumar jha 2" },
    { name: "विपुल कुमार घोष", roman: "vipul kumar ghosh" },
    { name: "नितेश कुमार दास", roman: "nitesh kumar das" },
    { name: "कमलेश कुमार झा", roman: "kamlesh kumar jha" },
    { name: "आशुतोष कुमार मिश्र", roman: "ashutosh kumar mishra" },
    { name: "बिट्टू कुमार झा", roman: "bittu kumar jha" },
    { name: "अजित कुमार झा", roman: "ajit kumar jha" },
    { name: "सिपुल कुमार घोष", roman: "sipul kumar ghosh" },
    { name: "अनुज कुमार दास", roman: "anuj kumar das" },
    { name: "सौरव कुमार दास", roman: "saurav kumar das" },
    { name: "कुशकांत झा", roman: "kushkant jha" },
    { name: "लवकांत झा", roman: "lavkant jha" },
    { name: "राजा कुमार झा", roman: "raja kumar jha" },
    { name: "मनीष कुमार मिश्र", roman: "manish kumar mishra" },
    { name: "सुयश कुमार झा", roman: "suyash kumar jha" },
    { name: "अंकित कुमार झा", roman: "ankit kumar jha" },
    { name: "सौरव कुमार चौधरी", roman: "saurav kumar chaudhary" },
    { name: "राहुल कुमार मिश्र", roman: "rahul kumar mishra" },
    { name: "अंशु कुमार घोष", roman: "anshu kumar ghosh" },
    { name: "अंकित कुमार झा (2)", roman: "ankit kumar jha 2" },
    { name: "सूरज कुमार झा", roman: "suraj kumar jha" },
    { name: "प्रणब कुमार झा", roman: "pranab kumar jha" }
];

const Players = () => {
    const [search, setSearch] = useState("");
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [copied, setCopied] = useState(false);

    // Toggle player selection
    const toggleSelect = (player) => {
        if (selectedPlayers.includes(player)) {
            setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
        } else {
            setSelectedPlayers([...selectedPlayers, player]);
        }
    };

    // Copy selected players to clipboard
    const copyToClipboard = () => {
        const playerListText = selectedPlayers.map((player, index) => `${index + 1}. ${player}`).join("\n");
        navigator.clipboard.writeText(playerListText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Filter players by both Hindi and English search
    const filteredPlayers = playersList.filter(
        ({ name, roman }) =>
            name.toLowerCase().includes(search.toLowerCase()) ||
            roman.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className=" min-h-screen w-full rounded-lg">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-5">
                    🏆 27वाँ टी.सी.सी कप कसबा 2025 🏆
                </h1>

                {/* Search input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="🔍 खिलाड़ियों को खोजें (हिंदी/English)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Player list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPlayers.map(({ name }, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded-lg cursor-pointer transition ${
                                selectedPlayers.includes(name)
                                    ? "bg-indigo-500 text-white"
                                    : "bg-white hover:bg-indigo-100"
                            }`}
                            onClick={() => toggleSelect(name)}
                        >
                            <span className="font-medium">{index + 1}. {name}</span>
                        </div>
                    ))}
                </div>

                {/* Selected players and copy button */}
                {selectedPlayers.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-center text-green-600">✅ चयनित खिलाड़ी:</h2>
                        <ul className="list-disc list-inside mt-2">
                            {selectedPlayers.map((player, index) => (
                                <li key={index}>{index + 1}. {player}</li>
                            ))}
                        </ul>

                        <button
                            onClick={copyToClipboard}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            📋 खिलाड़ियों की सूची कॉपी करें
                        </button>

                        {copied && (
                            <p className="mt-2 text-green-500">✅ सूची क्लिपबोर्ड में कॉपी हो गई!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Players;
