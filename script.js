async function searchUniversity() {

    const country =
        document.getElementById("countryInput").value.trim();

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

    result.innerHTML = `
        <h2 class="loading">
            ⏳ Sedang mencari universitas...
        </h2>
    `;

    try {

        const response = await fetch(
            `https://universities.hipolabs.com/search?country=${country}`
        );

        const data = await response.json();
        const now = new Date();

        document.getElementById("searchInfo").innerHTML = `
            📅 Pencarian terakhir:
            ${country}
            <br>
            ${now.toLocaleString ("id-ID")}
        `;

        if (!data || data.length === 0) {

            result.innerHTML = `
                <h2 class="error">
                    Universitas tidak ditemukan
                </h2>
            `;

            return;
        }

        // Khusus Indonesia, prioritaskan UMS
        if (country.toLowerCase() === "indonesia") {

            const umsIndex = data.findIndex(univ =>
                univ.name.toLowerCase().includes("muhammadiyah surakarta")
            );

            if (umsIndex > -1) {

                const ums = data.splice(umsIndex, 1)[0];

                data.unshift(ums);
            }
        }

        let output = `
            <div class="total">
                Ditemukan ${data.length} Universitas
                <br>
                Menampilkan 20 Universitas Pertama
            </div>
        `;

        data
            .slice(0, 20)
            .forEach((univ, index) => {

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
                            href="${univ.web_pages[0]}"
                            target="_blank">

                            🔗 Kunjungi Website

                        </a>

                    </div>
                `;
            });

        result.innerHTML = output;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <h2 class="error">
                ❌ Terjadi kesalahan saat mengambil data
            </h2>
        `;
    }
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
