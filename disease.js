
async function searchDiseaseGenes() {
  const diseaseInput = document.getElementById("diseaseInput").value.trim();
  if (!diseaseInput) {
    document.getElementById("diseaseResult").innerText = "Please enter a disease name";
    return;
  }

  document.getElementById("diseaseResult").innerHTML = "Loading disease-gene associations...";

  try {
    // First, search for the disease using the REST API
    const diseaseSearchUrl = `https://api.platform.opentargets.org/api/v4/public/search?q=${encodeURIComponent(diseaseInput)}&entity=disease&size=1`;
    
    const diseaseSearchResponse = await fetch(diseaseSearchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!diseaseSearchResponse.ok) {
      throw new Error(`Disease search failed: ${diseaseSearchResponse.status}`);
    }

    const diseaseData = await diseaseSearchResponse.json();
    
    if (!diseaseData.data || diseaseData.data.length === 0) {
      document.getElementById("diseaseResult").innerHTML = `
        <div class="no-results">
          <h3>No disease found</h3>
          <p>No reliable disease matching "${diseaseInput}" was found in the database. Please try a different search term or check the spelling.</p>
          <p><strong>Try searching for:</strong> breast cancer, Alzheimer's disease, type 2 diabetes, heart disease</p>
        </div>
      `;
      return;
    }

    const disease = diseaseData.data[0];
    const diseaseId = disease.id;

    // Now get gene associations using the REST API
    const associationsUrl = `https://api.platform.opentargets.org/api/v4/public/association/filter?disease=${diseaseId}&size=20&sort=overall_desc`;
    
    const associationsResponse = await fetch(associationsUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!associationsResponse.ok) {
      throw new Error(`Associations search failed: ${associationsResponse.status}`);
    }

    const associationsData = await associationsResponse.json();
    
    if (!associationsData.data || associationsData.data.length === 0) {
      document.getElementById("diseaseResult").innerHTML = `
        <div class="no-results">
          <h3>No gene associations found</h3>
          <p>No genes have been reliably correlated to "${disease.name}" in the current scientific literature.</p>
        </div>
      `;
      return;
    }

    // Display the results
    const associations = associationsData.data;
    let resultHTML = `
      <div class="disease-info">
        <h2>🔬 ${disease.name}</h2>
        <p class="disease-description">${disease.description || 'Disease information from Open Targets Platform'}</p>
        <p class="results-count">Found ${associations.length} gene associations with strong evidence:</p>
      </div>
      <div class="associations-list">
    `;

    associations.forEach((assoc, index) => {
      const target = assoc.target;
      const score = (assoc.score * 100).toFixed(1);
      
      resultHTML += `
        <div class="association-item" onclick="getGeneDetails('${target.id}', '${target.symbol}')">
          <div class="gene-info">
            <h4>${target.symbol}</h4>
            <p class="gene-name">${target.gene_info?.name || target.symbol}</p>
            <div class="evidence-score">
              <span class="score-label">Evidence Score:</span>
              <span class="score-value">${score}%</span>
              <div class="score-bar">
                <div class="score-fill" style="width: ${score}%"></div>
              </div>
            </div>
          </div>
          <div class="association-arrow">→</div>
        </div>
      `;
    });

    resultHTML += `
      </div>
      <div class="data-source">
        <p><strong>Data Source:</strong> <a href="https://platform.opentargets.org/" target="_blank">Open Targets Platform</a></p>
        <p>Evidence scores are based on genetic associations, known drugs, animal models, and text mining from scientific publications.</p>
      </div>
    `;

    document.getElementById("diseaseResult").innerHTML = resultHTML;

  } catch (error) {
    console.error("Error details:", error);
    
    // Fallback to a simple mock database if the API fails
    const mockResults = getMockDiseaseGenes(diseaseInput);
    if (mockResults) {
      document.getElementById("diseaseResult").innerHTML = mockResults;
    } else {
      document.getElementById("diseaseResult").innerHTML = `
        <div class="error">
          <h3>Service Temporarily Unavailable</h3>
          <p>The disease-gene association service is currently unavailable. This may be due to API limitations or network issues.</p>
          <p><strong>Error:</strong> ${error.message}</p>
          <p>Please try again later or try one of the example searches.</p>
        </div>
      `;
    }
  }
}

// Fallback mock data for common diseases
function getMockDiseaseGenes(diseaseInput) {
  const mockData = {
    "breast cancer": {
      name: "Breast Cancer",
      genes: [
        { symbol: "BRCA1", name: "BRCA1 DNA repair associated", score: 95 },
        { symbol: "BRCA2", name: "BRCA2 DNA repair associated", score: 92 },
        { symbol: "TP53", name: "Tumor protein p53", score: 88 },
        { symbol: "PTEN", name: "Phosphatase and tensin homolog", score: 82 },
        { symbol: "ATM", name: "ATM serine/threonine kinase", score: 78 }
      ]
    },
    "alzheimer's disease": {
      name: "Alzheimer's Disease",
      genes: [
        { symbol: "APOE", name: "Apolipoprotein E", score: 89 },
        { symbol: "APP", name: "Amyloid beta precursor protein", score: 85 },
        { symbol: "PSEN1", name: "Presenilin 1", score: 83 },
        { symbol: "PSEN2", name: "Presenilin 2", score: 78 },
        { symbol: "TREM2", name: "Triggering receptor expressed on myeloid cells 2", score: 72 }
      ]
    },
    "type 2 diabetes": {
      name: "Type 2 Diabetes",
      genes: [
        { symbol: "TCF7L2", name: "Transcription factor 7 like 2", score: 76 },
        { symbol: "PPARG", name: "Peroxisome proliferator activated receptor gamma", score: 73 },
        { symbol: "KCNJ11", name: "Potassium inwardly rectifying channel subfamily J member 11", score: 69 },
        { symbol: "HNF4A", name: "Hepatocyte nuclear factor 4 alpha", score: 65 },
        { symbol: "GCK", name: "Glucokinase", score: 62 }
      ]
    }
  };

  const normalizedInput = diseaseInput.toLowerCase();
  const disease = mockData[normalizedInput];
  
  if (!disease) return null;

  let resultHTML = `
    <div class="disease-info">
      <h2>🔬 ${disease.name}</h2>
      <p class="disease-description">Showing example gene associations (API service unavailable)</p>
      <p class="results-count">Found ${disease.genes.length} known gene associations:</p>
    </div>
    <div class="associations-list">
  `;

  disease.genes.forEach(gene => {
    resultHTML += `
      <div class="association-item" onclick="getGeneDetails('', '${gene.symbol}')">
        <div class="gene-info">
          <h4>${gene.symbol}</h4>
          <p class="gene-name">${gene.name}</p>
          <div class="evidence-score">
            <span class="score-label">Evidence Score:</span>
            <span class="score-value">${gene.score}%</span>
            <div class="score-bar">
              <div class="score-fill" style="width: ${gene.score}%"></div>
            </div>
          </div>
        </div>
        <div class="association-arrow">→</div>
      </div>
    `;
  });

  resultHTML += `
    </div>
    <div class="data-source">
      <p><strong>Note:</strong> This is example data shown when the external API is unavailable.</p>
      <p>Actual evidence scores are based on genetic associations, known drugs, animal models, and text mining from scientific publications.</p>
    </div>
  `;

  return resultHTML;
}

async function getGeneDetails(geneId, geneSymbol) {
  // Open a new page or redirect to gene explorer with this gene
  window.open(`index.html?gene=${geneSymbol}`, '_blank');
}

function randomDisease() {
  const exampleDiseases = [
    "breast cancer",
    "Alzheimer's disease", 
    "type 2 diabetes",
    "heart disease",
    "multiple sclerosis",
    "Parkinson's disease",
    "asthma"
  ];
  const randomDisease = exampleDiseases[Math.floor(Math.random() * exampleDiseases.length)];
  document.getElementById("diseaseInput").value = randomDisease;
  searchDiseaseGenes();
}
