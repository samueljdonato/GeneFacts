# GeneFacts - Gene Fact Explorer

https://genefacts.netlify.app

This acts as a web based app that allows the user to explore some gene information and attempt to discover disease gene associatons. The site provides an interactive interface to help query genetic data and learn about a condition or a gene without needing to navigate technical bioinformatics and genetics databases.

## Features

- **Gene Explorer**: Search for genes using Entrez IDs, Ensembl IDs, or gene symbols (TP53, BRCA1, etc.)
- **Multi-Species Support**: Query genes across human, mouse, and rat genomes
- **Disease Research**: Search for diseases and discover associated genes
- **Autocomplete**: Real-time gene suggestions as you type
- **Educational Content**: Learn about genes, DNA, RNA, and molecular biology concepts
- **Random Examples**: Quickly explore random genes to see what data is available

## Project Structure

```
GeneFacts-main/
├── index.html          # Main Gene Explorer page
├── disease.html        # Disease Research page
├── about.html          # Educational content about molecular biology
├── script.js           # Main gene search and autocomplete logic
├── disease.js          # Disease search and gene association logic
├── geneFacts.js        # Pre-defined gene facts database
├── style.css           # Styling for all pages
├── requirements.txt    # Python dependencies (if any)
└── (other configs)     # Optional: CI / hosting configs if present
```

## How It Works

### Frontend (HTML & CSS)
- **index.html**: Navigation bar and gene search interface
- **disease.html**: Disease search interface
- **about.html**: Educational pages explaining molecular biology
- **style.css**: Responsive styling for all pages

### JavaScript Logic

#### **script.js** - Gene Exploration
- `getGeneInfo()`: Fetches gene data from the MyGene.info API
  - Accepts Entrez IDs (numeric), Ensembl IDs (ENSG...), or gene symbols
  - Supports filtering by species (human, mouse, rat)
  - Returns gene details: name, symbol, location, function, etc.
  
- `autocompleteGene()`: Provides real-time gene suggestions
  - Queries the MyGene.info API as user types
  - Displays matching genes in a dropdown list

- `randomGene()`: Displays information about a random example gene

#### **disease.js** - Disease Research
- `searchDiseaseGenes()`: Searches for diseases and associated genes
  - Uses the OpenTargets API to find disease-gene relationships
  - Returns top 20 genes associated with the disease
  - Displays association scores and evidence

#### **geneFacts.js** - Gene Database
- Pre-defined facts about well-known genes (TP53, BRCA1, MYC, CFTR, APOE)
- Used for quick reference and educational purposes

## APIs Used

1. **MyGene.info** - Gene Information
   - URL: `https://mygene.info/v3/`
   - Provides comprehensive gene data across multiple species
   - Supports queries by Entrez ID, Ensembl ID, or gene symbol

2. **OpenTargets** - Disease-Gene Associations
   - URL: `https://api.platform.opentargets.org/api/v4/`
   - Connects diseases with associated genes
   - Provides evidence scores for associations

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Running Locally

**Using Python's built-in HTTP server:**
```bash
cd /path/to/GeneFacts-main
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Using Node.js:**
```bash
npx http-server
```

**Using VS Code Live Server:**
1. Install the "Live Server" extension
2. Right-click `index.html` and select "Open with Live Server"

## Usage Examples

### Search for a Gene
1. Go to the **Gene Explorer** page
2. Enter a gene identifier:
   - By Entrez ID: `7157` (TP53)
   - By Ensembl ID: `ENSG00000141510`
   - By Gene Symbol: `TP53`
3. Select a species (Human, Mouse, or Rat)
4. Click "Get Gene Info" to see detailed information

### Explore Disease-Gene Relationships
1. Go to the **Disease Research** page
2. Enter a disease name (e.g., "breast cancer", "Alzheimer's disease")
3. View the top 20 genes associated with that disease
4. See association scores and evidence

### Learn About Molecular Biology
1. Visit the **Learn About Molecular Biology** page
2. Read about genes, DNA, RNA, and proteins
3. Understand how genes are expressed and regulated

## Architecture

```
User Interface (HTML)
        ↓
User Input (Forms)
        ↓
JavaScript Logic (script.js, disease.js)
        ↓
API Calls (fetch)
        ↓
External APIs (MyGene.info, OpenTargets)
        ↓
Data Processing & Display
```

## Data Flow

**Gene Search Flow:**
1. User enters gene ID/symbol
2. JavaScript detects input format (Entrez/Ensembl/Symbol)
3. Fetch request sent to MyGene.info API
4. API returns gene data (name, function, location, etc.)
5. Results formatted and displayed on page

**Disease Search Flow:**
1. User enters disease name
2. Fetch request to OpenTargets disease search endpoint
3. Get disease ID from results
4. Query OpenTargets for associated genes
5. Parse and display associations with scores

## Styling

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark-Friendly**: CSS includes styling for various color schemes
- **Navigation**: Easy switching between Gene Explorer, Disease Research, and Educational content

## Troubleshooting

**Problem**: "Gene not found" error
- Solution: Check spelling, try a different ID format, or use the Random Example button

**Problem**: No disease results
- Solution: Try common diseases (breast cancer, diabetes, heart disease) or verify the disease name

**Problem**: API timeouts
- Solution: Try again - the external APIs may be temporarily unavailable

## Future Enhancements

- Add caching for frequently searched genes
- Include protein structure visualization
- Add pathway analysis
- Export results to CSV/JSON
- Dark mode toggle
- Sequence alignment tools
- Gene expression data visualization

## License

This project is open source and available for educational purposes.

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: MyGene.info, OpenTargets
- **Hosting Options**: Replit, Netlify, Vercel, GitHub Pages, or local server
- **Development**: No build tools required - runs directly in the browser

## Contributing

Feel free to fork, modify, and improve this project. Some ideas:
- Add more species support
- Implement literature search integration
- Create interactive network visualizations
- Add bookmark/favorites functionality
