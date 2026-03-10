"""Quick API crosscheck with known exoplanet data."""
import requests
import json

BASE = "http://127.0.0.1:5000/api/predict"

tests = [
    {
        "name": "Kepler-22b (confirmed, habitable zone)",
        "data": {
            "koi_period": 289.862,
            "koi_depth": 492.0,
            "koi_duration": 7.4,
            "koi_steff": 5518,
            "koi_srad": 0.979,
            "koi_score": 0.944,
        },
        "expect": "CONFIRMED",
    },
    {
        "name": "Hot Jupiter-like (short period, large planet)",
        "data": {
            "koi_period": 3.5,
            "koi_depth": 15000.0,
            "koi_duration": 2.5,
            "koi_steff": 6000,
            "koi_srad": 1.2,
            "koi_score": 0.3,
        },
        "expect": "possible FALSE POSITIVE",
    },
    {
        "name": "Earth-like candidate (Sun-like star, 1yr period)",
        "data": {
            "koi_period": 365.0,
            "koi_depth": 84.0,
            "koi_duration": 6.0,
            "koi_steff": 5778,
            "koi_srad": 1.0,
            "koi_score": 0.85,
        },
        "expect": "CONFIRMED (Earth analogue)",
    },
    {
        "name": "Kepler-452b-like (super-Earth, habitable zone)",
        "data": {
            "koi_period": 384.843,
            "koi_depth": 197.0,
            "koi_duration": 9.1,
            "koi_steff": 5757,
            "koi_srad": 1.11,
            "koi_score": 0.88,
        },
        "expect": "CONFIRMED",
    },
    {
        "name": "Missing required fields (error case)",
        "data": {
            "koi_period": 10.0,
            "koi_depth": 500.0,
        },
        "expect": "error",
    },
    {
        "name": "Earth-like small planet (depth≈84 ppm, Sun-like star)",
        "data": {
            "koi_period": 365.0,
            "koi_depth": 84.0,
            "koi_duration": 6.0,
            "koi_steff": 5778,
            "koi_srad": 1.0,
            "koi_score": 0.85,
        },
        "expect": "CONFIRMED — predicted radius ≈ 1.0 R⊕ (Earth-like)",
    },
    {
        "name": "Mars-like sub-Earth (very shallow transit)",
        "data": {
            "koi_period": 687.0,
            "koi_depth": 25.0,
            "koi_duration": 5.0,
            "koi_steff": 5778,
            "koi_srad": 1.0,
            "koi_score": 0.70,
        },
        "expect": "radius ≈ 0.5 R⊕ (Sub-Earth)",
    },
    {
        "name": "Super-Earth (Kepler-69c-like)",
        "data": {
            "koi_period": 242.46,
            "koi_depth": 240.0,
            "koi_duration": 7.5,
            "koi_steff": 5640,
            "koi_srad": 0.93,
            "koi_score": 0.90,
        },
        "expect": "CONFIRMED — predicted radius ≈ 1.7 R⊕ (Super-Earth)",
    },
]

for i, t in enumerate(tests, 1):
    print("=" * 60)
    print(f"TEST {i}: {t['name']}")
    print(f"Expected: {t['expect']}")
    print("=" * 60)
    resp = requests.post(BASE, json=t["data"])
    r = resp.json()

    if "error" in r:
        print(f"  ERROR: {r['error']}")
    else:
        print(f"  Prediction:          {r['prediction']}")
        print(f"  Confirmation prob:   {r['confirmation_probability']}%")
        print(f"  Predicted radius:    {r['predicted_radius']} R_Earth")
        print(f"  Radius source:       {r['radius_source']}")
        print(f"  Physics radius:      {r['physics_radius']} R_Earth")
        print(f"  ML avg radius:       {r['ml_avg_radius']} R_Earth")
        print(f"  Planet type:         {r['planet_type']} — {r['planet_type_desc']}")
        print(f"  Habitability score:  {r['habitability_score']}")
        print(f"  Eq. temperature:     {r['equilibrium_temp']} K")
        print(f"  Insolation flux:     {r['insolation_flux']}")
        print(f"  Hab factors:         {r['habitability_factors']}")
        print(f"  --- Classifier breakdown ---")
        for name, prob in r["clf_breakdown"].items():
            print(f"    {name:30s} {prob:6.2f}%")
    print()

print("All tests complete.")
