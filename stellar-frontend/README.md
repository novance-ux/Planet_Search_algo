# Stellar Analytics — Exoplanet Verification System (Frontend)

A cinematic, ML-powered frontend for the Stellar Analytics exoplanet verification system, built for TECHNEX '26.

## Features

- **11-parameter KOI input form** with real-time validation and demo signal loading
- **Telescope lens transition** — cinematic aperture animation between submission and results
- **3D planet comparison** — Three.js Earth vs. predicted planet with proportional sizing
- **Cosmic context scatter chart** — 15 known exoplanets + your prediction highlighted
- **Analytics dashboard** — feature importance, confidence gauge, radius distribution
- **Mission log** — in-session prediction history with re-run capability
- **Space-themed UI** — dark mission control aesthetic with animated starfield

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** — utility-first styling
- **Three.js** (`@react-three/fiber` + `@react-three/drei`) — 3D planet visualization
- **Framer Motion** — transitions, entrance animations, telescope overlay
- **GSAP** — scroll-triggered SVG animations
- **Recharts** — scatter charts, bar charts, area charts
- **tsParticles** — animated starfield background
- **Axios** — HTTP client for backend communication

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend running (Flask API on port 5000)

### Install Dependencies

```bash
cd stellar-frontend
npm install --legacy-peer-deps
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Default `.env`:
```
VITE_API_BASE_URL=http://localhost:5000
```

### Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

### Connect to Backend

Ensure the Flask backend is running:

```bash
cd ../app
pip install -r requirements.txt
python app.py
```

The backend serves predictions at `POST /api/predict`.

## Folder Structure

```
src/
├── main.jsx                          # Entry point
├── App.jsx                           # Root: scroll-snap, state management
├── index.css                         # CSS variables, keyframes, resets
├── components/
│   ├── layout/
│   │   ├── StarfieldBackground.jsx   # tsParticles starfield
│   │   ├── NavDots.jsx               # Section navigation dots
│   │   └── Toast.jsx                 # Toast notification system
│   ├── sections/
│   │   ├── HeroSection.jsx           # Landing hero + CTA
│   │   ├── MissionBriefSection.jsx   # System overview + data flow
│   │   ├── InputFormSection.jsx      # KOI input form
│   │   ├── ResultsSection.jsx        # Classification + 3D planet
│   │   ├── CosmicContextSection.jsx  # Known planets scatter chart
│   │   ├── InsightsSection.jsx       # Analytics charts
│   │   └── HistorySection.jsx        # Prediction history log
│   └── ui/
│       ├── InputField.jsx            # Individual form field
│       ├── TooltipIcon.jsx           # Info tooltip
│       ├── ValidationMessage.jsx     # Error/success indicator
│       ├── DemoSignalButton.jsx      # Load demo data button
│       ├── SubmitButton.jsx          # Primary submit button
│       ├── RadarLoader.jsx           # Radar loading overlay
│       ├── TelescopeTransition.jsx   # Cinematic transition
│       ├── ClassificationBadge.jsx   # Result verdict badge
│       ├── ConfidenceBar.jsx         # Probability bar
│       ├── ConfidenceGauge.jsx       # SVG semi-circle gauge
│       ├── NumberCounter.jsx         # Animated number display
│       ├── PlanetScene.jsx           # Three.js planet render
│       ├── PlanetInfoCard.jsx        # Planet details cards
│       ├── DataFlowWheel.jsx         # SVG pipeline diagram
│       ├── KnownPlanetsChart.jsx     # Scatter chart
│       ├── FeatureImportanceChart.jsx# Feature importance bars
│       ├── RadiusDistributionChart.jsx# Area distribution chart
│       ├── HistoryTable.jsx          # History log table
│       ├── SectionLabel.jsx          # Section header label
│       └── StatBadge.jsx             # Metric pill badge
├── hooks/
│   ├── usePrediction.js              # API call management
│   ├── usePredictionHistory.js       # In-memory history reducer
│   ├── useScrollSection.js           # Active section tracking
│   ├── useFormValidation.js          # Form state + validation
│   └── useNumberCounter.js           # Animated counter
├── constants/
│   ├── inputFields.js                # Field definitions
│   ├── featureImportance.js          # Model feature weights
│   ├── knownPlanets.js               # 15 reference exoplanets
│   ├── planetTypes.js                # Radius classification + distribution
│   └── demoSignal.js                 # Kepler-22b demo values
└── utils/
    ├── validators.js                 # Field validation logic
    ├── planetClassifier.js           # Planet type + habitability
    ├── quadrantClassifier.js         # Scatter chart quadrant
    └── formatters.js                 # Display formatters
```

## API Integration

The frontend communicates with the Flask backend at `{VITE_API_BASE_URL}/api/predict`.

**Request** (POST, JSON):
```json
{
  "koi_period": 289.9,
  "koi_duration": 7.4,
  "koi_depth": 492.0,
  "koi_ror": 0.048,
  "koi_impact": 0.21,
  "koi_model_snr": 17.1,
  "koi_num_transits": 3,
  "koi_steff": 5793,
  "koi_slogg": 4.44,
  "koi_srad": 0.98,
  "koi_smass": 0.97
}
```

**Response**:
```json
{
  "prediction": "CONFIRMED",
  "confirmation_probability": 94.2,
  "predicted_radius": 2.37,
  "planet_type": "Super-Earth"
}
```
