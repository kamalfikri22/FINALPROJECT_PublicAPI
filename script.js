const universityData = {
    indonesia: [
        {
            name: "Universitas Muhammadiyah Surakarta",
            country: "Indonesia",
            website: "https://www.ums.ac.id"
        },
        {
            name: "Universitas Indonesia",
            country: "Indonesia",
            website: "https://www.ui.ac.id"
        },
        {
            name: "Institut Teknologi Bandung",
            country: "Indonesia",
            website: "https://www.itb.ac.id"
        },
        {
            name: "Universitas Gadjah Mada",
            country: "Indonesia",
            website: "https://ugm.ac.id"
        },
        {
            name: "Universitas Airlangga",
            country: "Indonesia",
            website: "https://www.unair.ac.id"
        }
    ],

    japan: [
        {
            name: "The University of Tokyo",
            country: "Japan",
            website: "https://www.u-tokyo.ac.jp"
        },
        {
            name: "Kyoto University",
            country: "Japan",
            website: "https://www.kyoto-u.ac.jp"
        },
        {
            name: "Osaka University",
            country: "Japan",
            website: "https://www.osaka-u.ac.jp"
        },
        {
            name: "Tohoku University",
            country: "Japan",
            website: "https://www.tohoku.ac.jp"
        },
        {
            name: "Waseda University",
            country: "Japan",
            website: "https://www.waseda.jp"
        }
    ],

    malaysia: [
        {
            name: "Universiti Malaya",
            country: "Malaysia",
            website: "https://www.um.edu.my"
        },
        {
            name: "Universiti Kebangsaan Malaysia",
            country: "Malaysia",
            website: "https://www.ukm.my"
        },
        {
            name: "Universiti Putra Malaysia",
            country: "Malaysia",
            website: "https://www.upm.edu.my"
        },
        {
            name: "Universiti Teknologi Malaysia",
            country: "Malaysia",
            website: "https://www.utm.my"
        },
        {
            name: "Universiti Sains Malaysia",
            country: "Malaysia",
            website: "https://www.usm.my"
        }
    ],

    singapore: [
        {
            name: "National University of Singapore",
            country: "Singapore",
            website: "https://www.nus.edu.sg"
        },
        {
            name: "Nanyang Technological University",
            country: "Singapore",
            website: "https://www.ntu.edu.sg"
        }
    ]
};

async function searchUniversity() {

    const country = document
        .getElementById("countryInput")
        .value
        .trim()
        .toLowerCase();

    const result =
        document.getElementById("result");

    if (country === "") {

        result.innerHTML = `
            <h2 class="error">
                Masukkan nama negara terlebih dahulu
            </h2>
        `;
        return;
    }

    const data = universityData[country];

    const now = new Date();

    document.getElementById("searchInfo").innerHTML = `
        📅 Pencarian terakhir:
        ${country}
        <br>
        ${now.toLocaleString("id-ID")}
    `;

    if (!data) {

        result.innerHTML = `
            <h2 class="error">
                Data universitas untuk negara tersebut belum tersedia
            </h2>
        `;
        return;
    }

    let output = `
        <div class="total">
            Ditemukan ${data.length} Universitas
        </div>
    `;

    data.forEach((univ, index) => {

        output += `
            <div class="card">

                <h3>
                    ${index + 1}. ${univ.name}
                </h3>

                <p>
                    🌍 <strong>Negara:</strong>
                    ${univ.country}
                </p>

                <a
                    href="${univ.website}"
                    target="_blank">

                    🔗 Kunjungi Website

                </a>

            </div>
        `;
    });

    result.innerHTML = output;
}

document.getElementById("countryInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        searchUniversity();
    }

});

function resetSearch(){

    document.getElementById("countryInput").value = "";

    document.getElementById("searchInfo").innerHTML = "";

    document.getElementById("result").innerHTML = `
        <div class="welcome">
            🔍 Silakan masukkan nama negara untuk mencari universitas
        </div>
    `;
}
