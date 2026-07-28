# Personality & Career Assessment Platform

A React-based frontend personality and career assessment platform, covering MBTI, Enneagram, Big Five, and other mainstream personality assessments, alongside career interest, work values, and professional skills assessments. Features include assessment record tracking, personality change trend analysis, and comprehensive career matching analysis.

## Features

### Assessment Suite

**Personality Assessments (5)**

| Assessment | Questions | Dimensions / Types |
|------------|-----------|---------------------|
| MBTI | 20 | E/I, S/N, T/F, J/P |
| Enneagram | 18 | Types 1-9 |
| Big Five (BFI) | 20 | Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism |
| DISC | 16 | D/I/S/C Behavioral Styles |
| Holland Code | 18 | R/I/A/S/E/C Interest Types |

**Career Assessments (3)**

| Assessment | Questions | Dimensions |
|------------|-----------|------------|
| Career Interest | 12 | Conventional, Investigative, Enterprising, Social, Artistic, Realistic |
| Work Values | 12 | Achievement, Autonomy, Social Contribution, Work Environment, Compensation, Stability |
| Skills Aptitude | 12 | Analytical Thinking, Creativity, Leadership, Execution, Communication, Technical |

### Core Capabilities

- **Relationship Graph** — SVG visualization of interconnections across all 8 assessments
- **Assessment Flow** — Progress bar + question navigation + submission confirmation
- **Results Display** — Dedicated result pages per assessment (dimension bar charts, radar charts, ranked lists, etc.)
- **History Records** — Grouped by date, with filtering, deletion, and JSON export/import
- **Change Trends** — Track score changes across multiple attempts of the same assessment
- **Comprehensive Career Analysis** — Multi-dimensional weighted matching, recommending Top 10 careers with match percentages
- **Current Job Analysis** — Input your current job to receive a 4-level match evaluation with personalized advice
- **Data Persistence** — Based on localStorage, no backend server required

## Tech Stack

- **Framework**: React 19
- **Routing**: React Router DOM 7
- **Build Tool**: Vite 5
- **Styling**: Pure CSS
- **Storage**: localStorage

## Project Structure

```
src/
├── App.jsx                          # Route configuration
├── main.jsx                         # Application entry point
├── index.css                        # Global styles
├── components/
│   ├── HomePage.jsx                 # Home (assessment entries + relationship graph)
│   ├── AssessmentTaking.jsx         # Assessment taking page
│   ├── AssessmentResult.jsx         # Results display page
│   ├── HistoryPage.jsx              # History records
│   └── ComprehensiveAnalysis.jsx    # Comprehensive career analysis
├── data/
│   ├── assessments.js               # 8 assessments, scoring logic, graph data
│   └── careerMapping.js             # MBTI → career mapping, comprehensive matching
├── utils/
│   └── storage.js                   # localStorage wrapper (read/write/export/import)
└── assets/                          # Static assets
```

## Getting Started

### Prerequisites

- Node.js >= 18

### Installation & Usage

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open `http://localhost:5173` in your browser.

## How to Use

1. Select any assessment from the home page to start
2. View your results after completing the assessment
3. Go to "History" to view/export past assessment records
4. After completing multiple assessments, visit "Comprehensive Analysis" for career matching recommendations

## License

[Apache-2.0](LICENSE)
