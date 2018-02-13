var borders = {
    0:[1,2],
    1:[0,2,3,4],
    2:[0,1,4,5,8,9],
    3:[1,4,6],
    4:[1,2,3,5,6],
    5:[2,4,6,7,9,10],
    6:[3,4,5,7,10],
    7:[5,6,10,15,16],
    8:[2,9,11,12],
    9:[2,5,8,10,12,13],
    10:[5,6,7,9,13,14,15],
    11:[8,12,17],
    12:[8,9,11,13,17,18],
    13:[9,10,12,14,18,19],
    14:[10,13,15,19],
    15:[7,10,14,16,19,20],
    16:[7,15,20,21],
    17:[11,12,18,22],
    18:[12,13,17,19,22,23],
    19:[13,14,15,18,20,23,25,26],
    20:[15,16,19,21,26,27],
    21:[16,20,27],
    22:[17,18,23,31],
    23:[18,19,22,24,25],
    24:[23,25,31,32],
    25:[19,23,25,26,32,33,34],
    26:[19,20,25,27,28,29,34,35],
    27:[20,21,26,28],
    28:[26,27,29,30],
    29:[26,28,30,35,36],
    30:[28,29],
    31:[22,24,32],
    32:[24,25,31,33,41],
    33:[25,32,34,41,47],
    34:[25,26,33,35,47],
    35:[26,29,34,36],
    36:[29,35],
    37:[38],
    38:[37,39,42],
    39:[38,40,42],
    40:[39,41,42,44,45],
    41:[32,33,40,45,46,47],
    42:[38,39,40,43,44],
    43:[42,44],
    44:[40,42,43],
    45:[40,41,46],
    46:[41,45,47],
    47:[33,34,41,46],
    48:[],
    49:[]
};

var WA = {
    name : "Washington",
abbreviation: "WA",
nickname: ["Evergreen State"]
};

var OR = {
    name : "Oregon",
abbreviation: "OR",
nickname: ["Beaver State", "Pacific Wonderland", "Webfoot State"]
};

var ID = {
name: "Idaho",
abbreviation: "ID",
nickname: ["Gem State", "Gem of the Mountains", "Little Ida", "Spud State"]
};

var CA = {
name: "California",
abbreviation: "CA",
nickname: ["El Dorado State", "The Golden State"]
};

var NV = {
name: "Nevada",
abbreviation: "NV",
nickname: ["Battle Born State", "Sagebrush State", "Silver State"]
};

var UT = {
name: "Utah",
abbreviation: "UT",
nickname: ["Beehive State", "Mormon State", "Friendly State"]
};

var AZ = {
name: "Arizona",
abbreviation: "AZ",
nickname: ["Apache State", "Aztec State", "Baby State", "Copper State","Grand Canyon State","Italy of America","Sand Hill State","Sunset State","Sweetheart State","Valentine State"]
};

var NM = {
name: "New Mexico",
abbreviation: "NM",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var MT = {
name: "Montana",
abbreviation: "MT",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var WY = {
name: "Wyoming",
abbreviation: "WY",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var CO = {
name: "Colorado",
abbreviation: "CO",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var ND = {
name: "North Dakota",
abbreviation: "ND",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var SD = {
name: "South Dakota",
abbreviation: "SD",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var NE = {
name: "Nebraska",
abbreviation: "NE",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var KS = {
name: "Kansas",
abbreviation: "KS",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var OK = {
name: "Oklahoma",
abbreviation: "OK",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var TX = {
name: "Texas",
abbreviation: "TX",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var MN = {
name: "Minnesota",
abbreviation: "MN",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var IA = {
name: "Iowa",
abbreviation: "IA",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var MO = {
name: "Missouri",
abbreviation: "MO",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var AR = {
name: "Arkansas",
abbreviation: "AR",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var LA = {
name: "Louisiana",
abbreviation: "LA",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var WI = {
name: "Wisconsin",
abbreviation: "WI",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var IL = {
name: "Illinois",
abbreviation: "IL",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var IN = {
name: "Indiana",
abbreviation: "IN",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var KY = {
name: "Kentucky",
abbreviation: "KY",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var TN = {
name: "Tennessee",
abbreviation: "TN",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var MS = {
name: "Mississippi",
abbreviation: "MS",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var AL = {
name: "Alabama",
abbreviation: "AL",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var GA = {
name: "Georgia",
abbreviation: "GA",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var FL = {
name: "Florida",
abbreviation: "FL",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var MI = {
name: "Michigan",
abbreviation: "MI",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var OH = {
name: "Ohio",
abbreviation: "OH",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var WV = {
name: "West Virginia",
abbreviation: "WV",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var VA = {
name: "Virginia",
abbreviation: "VA",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var NC = {
name: "North Carolina",
abbreviation: "NC",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var SC = {
name: "South Carolina",
abbreviation: "SC",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var ME = {
name: "Maine",
abbreviation: "ME",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var NH = {
name: "New Hampshire",
abbreviation: "NH",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var VT = {
name: "Vermont",
abbreviation: "VT",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var NY = {
name: "New York ",
abbreviation: "NY",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var PA = {
name: "Pennsylvania",
abbreviation: "PA",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var MA = {
name: "Massachusetts",
abbreviation: "MA",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var RI = {
name: "Rhode Island",
abbreviation: "RI",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var CT = {
name: "Connecticut",
abbreviation: "CT",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var NJ = {
name: "New Jersey",
abbreviation: "NJ",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var DE = {
name: "Delaware",
abbreviation: "DE",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var MD = {
name: "Maryland",
abbreviation: "MD",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var HI = {
name: "Hawaii",
abbreviation: "HI",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var AK = {
name: "Alaska",
abbreviation: "AK",
nickname: ["Cactus State", "Land of Enchantment", "Land of Sunshine"]
};

var states = {
    0:WA,
    1:OR,
    2:ID,
    3:CA,
    4:NV,
    5:UT,
    6:AZ,
    7:NM,
    8:MT,
    9:WY,
    10:CO,
    11:ND,
    12:SD,
    13:NE,
    14:KS,
    15:OK,
    16:TX,
    17:MN,
    18:IA,
    19:MO,
    20:AR,
    21:LA,
    22:WI,
    23:IL,
    24:IN,
    25:KY,
    26:TN,
    27:MS,
    28:AL,
    29:GA,
    30:FL,
    31:MI,
    32:OH,
    33:WV,
    34:VA,
    35:NC,
    36:SC,
    37:ME,
    38:NH,
    39:VT,
    40:NY,
    41:PA,
    42:MA,
    43:RI,
    44:CT,
    45:NJ,
    46:DE,
    47:MD,
    48:HI,
    49:AK
};

