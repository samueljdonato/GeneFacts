
// // Check for gene parameter in URL on page load. if someone is to add a gene to the URL, this will load the gene info automatically
// // Example URL: index.html?gene=TP53
// document.addEventListener('DOMContentLoaded', function() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const geneParam = urlParams.get('gene');
//   if (geneParam) {
//     document.getElementById("geneInput").value = geneParam;
//     getGeneInfo();
//   }
// });

// // // Function to fetch gene information from MyGene.info API
// // async function getGeneInfo() {
// //   const geneInput = document.getElementById("geneInput").value.trim();
// //   if (!geneInput) {
// //     document.getElementById("result").innerText = "Please enter an Entrez ID or Gene Symbol";
// //     return;
// //   }

// //   document.getElementById("result").innerText = "Loading...";

// async function getGeneInfo() {
//   const geneInput = document.getElementById("geneInput").value.trim();
//   const species = document.getElementById("speciesSelect").value;

//   if (!geneInput) {
//     document.getElementById("result").innerText = "Please enter an ID or symbol";
//     return;
//   }

//   document.getElementById("result").innerText = "Loading...";

//   try {
//     let gene;

//     if (/^\d+$/.test(geneInput)) {
//       // Entrez ID
//       const response = await fetch(`https://mygene.info/v3/gene/${geneInput}`);
//       gene = await response.json();

//     } else if (/^ENS\w+/.test(geneInput)) {
//       // Ensembl ID
//       const ensemblResponse = await fetch(`https://mygene.info/v3/query?q=ensembl.gene:${geneInput}&species=${species}&size=1`);
//       const ensemblData = await ensemblResponse.json();
//       if (ensemblData.hits?.length > 0) {
//         const detailResponse = await fetch(`https://mygene.info/v3/gene/${ensemblData.hits[0]._id}`);
//         gene = await detailResponse.json();
//       } else {
//         gene = { error: "Gene not found" };
//       }

//     } else {
//       // Symbol
//       const symbolResponse = await fetch(`https://mygene.info/v3/query?q=symbol:${geneInput}&species=${species}&size=1`);
//       const symbolData = await symbolResponse.json();

//       if (symbolData.hits?.length > 0) {
//         const detailResponse = await fetch(`https://mygene.info/v3/gene/${symbolData.hits[0]._id}`);
//         gene = await detailResponse.json();
//       } else {
//         gene = { error: "Gene not found" };
//       }
//     }


//     async function autocompleteGene() {
//       const input = document.getElementById("geneInput").value.trim();
//       const species = document.getElementById("speciesSelect").value;

//       if (input.length < 2) return;  // wait until 2+ characters

//       const res = await fetch(`https://mygene.info/v3/suggest?q=${input}&species=${species}&size=5`);
//       const data = await res.json();

//       const datalist = document.getElementById("suggestions");
//       datalist.innerHTML = "";

//       data.forEach(gene => {
//         const option = document.createElement("option");
//         option.value = gene.symbol;
//         datalist.appendChild(option);
//       });
//     }





//     // Fetch gene information from MyGene.info API
//     try {
//       let gene;

//       // Check if input is numeric (likely an Entrez ID)
//       if (/^\d+$/.test(geneInput)) {
//         // Direct ID lookup
//         const response = await fetch(`https://mygene.info/v3/gene/${geneInput}`);
//         gene = await response.json();
//       } else {
//         // Symbol search
//         const symbolResponse = await fetch(`https://mygene.info/v3/query?q=symbol:${geneInput}&species=human&size=1`);
//         const symbolData = await symbolResponse.json();

//         if (symbolData.hits && symbolData.hits.length > 0) {
//           const detailResponse = await fetch(`https://mygene.info/v3/gene/${symbolData.hits[0]._id}`);
//           gene = await detailResponse.json();
//         } else {
//           gene = { error: "Gene not found" };
//         }
//       }

//       // Display gene information
//       if (gene && !gene.error) {
//         const info = `
//         <strong>Name:</strong> ${gene.name || "N/A"}<br>
//         <strong>Ensembl:</strong> ${gene.ensembl?.gene || "N/A"}<br>
//         <strong>Symbol:</strong> ${gene.symbol || "N/A"}<br>
//         <strong>Entrez ID:</strong> ${gene._id || "N/A"}<br>
//         <strong>Type:</strong> ${gene.type_of_gene || "N/A"}<br>
//         <strong>Chromosome:</strong> ${gene.genomic_pos_hg19?.chr || "N/A"}<br>
//         <strong>Summary:</strong> ${gene.summary || "N/A"}
//       `;
//         document.getElementById("result").innerHTML = info;
//       } else {
//         document.getElementById("result").innerText = "Gene not found. Please check the Entrez ID or Gene Symbol.";
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       document.getElementById("result").innerText = "Error fetching gene information. Please try again.";
//     }
//   }

// function randomGene() {
//     const exampleGenes = ["TP53", "BRCA1", "MYC", "CFTR", "APOE", "7157", "672"];
//     const randomGene = exampleGenes[Math.floor(Math.random() * exampleGenes.length)];
//     document.getElementById("geneInput").value = randomGene;
//     getGeneInfo();
//   }













// New code

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const geneParam = urlParams.get('gene');
  if (geneParam) {
    document.getElementById("geneInput").value = geneParam;
    getGeneInfo();
  }
});

async function getGeneInfo() {
  const geneInput = document.getElementById("geneInput").value.trim();
  const species = document.getElementById("speciesSelect").value;

  if (!geneInput) {
    document.getElementById("result").innerText = "Please enter an ID or symbol";
    return;
  }

  document.getElementById("result").innerText = "Loading...";

  try {
    let gene;

    // 🧬 Detect input type
    if (/^\d+$/.test(geneInput)) {
      // Entrez ID
      const response = await fetch(`https://mygene.info/v3/gene/${geneInput}`);
      gene = await response.json();

    } else if (/^ENS\w+/.test(geneInput)) {
      // Ensembl ID
      const ensemblResponse = await fetch(`https://mygene.info/v3/query?q=ensembl.gene:${geneInput}&species=${species}&size=1`);
      const ensemblData = await ensemblResponse.json();
      if (ensemblData.hits?.length > 0) {
        const detailResponse = await fetch(`https://mygene.info/v3/gene/${ensemblData.hits[0]._id}`);
        gene = await detailResponse.json();
      } else {
        gene = { error: "Gene not found" };
      }

    } else {
      // Gene symbol
      const symbolResponse = await fetch(`https://mygene.info/v3/query?q=symbol:${geneInput}&species=${species}&size=1`);
      const symbolData = await symbolResponse.json();
      if (symbolData.hits?.length > 0) {
        const detailResponse = await fetch(`https://mygene.info/v3/gene/${symbolData.hits[0]._id}`);
        gene = await detailResponse.json();
      } else {
        gene = { error: "Gene not found" };
      }
    }

    // 🎯 Render result
    if (gene && !gene.error) {
      const info = `
        <strong>Name:</strong> ${gene.name || "N/A"}<br>
        <strong>Ensembl:</strong> ${gene.ensembl?.gene || "N/A"}<br>
        <strong>Symbol:</strong> ${gene.symbol || "N/A"}<br>
        <strong>Entrez ID:</strong> ${gene._id || "N/A"}<br>
        <strong>Type:</strong> ${gene.type_of_gene || "N/A"}<br>
        <strong>Chromosome:</strong> ${gene.genomic_pos_hg19?.chr || "N/A"}<br>
        <strong>Summary:</strong> ${gene.summary || "N/A"}
      `;
      document.getElementById("result").innerHTML = info;
    } else {
      document.getElementById("result").innerText = "Gene not found. Please check the input.";
    }

  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "Error fetching gene information. Please try again.";
  }
}

// 🔍 Autocomplete Gene Symbols
async function autocompleteGene() {
  const input = document.getElementById("geneInput").value.trim();
  const species = document.getElementById("speciesSelect").value;
  if (input.length < 2) return;

  try {
    const res = await fetch(`https://mygene.info/v3/suggest?q=${input}&species=${species}&size=5`);
    const data = await res.json();

    const datalist = document.getElementById("suggestions");
    datalist.innerHTML = "";

    data.forEach(gene => {
      const option = document.createElement("option");
      option.value = gene.symbol;
      datalist.appendChild(option);
    });
  } catch (err) {
    console.error("Autocomplete error:", err);
  }
}

// 🎲 Random Gene Examples
function randomGene() {
  const exampleGenes = ["TP53", "BRCA1", "MYC", "CFTR", "APOE", "7157", "672", "ENSG00000141510"];
  const randomGene = exampleGenes[Math.floor(Math.random() * exampleGenes.length)];
  document.getElementById("geneInput").value = randomGene;
  getGeneInfo();
}


