"""Comprehensive test across all planet size classes with known exoplanets."""
import requests

BASE = "http://127.0.0.1:5000/api/predict"

tests = [
    # ── SUB-EARTH (<0.8 R⊕) ──
    {"name": "Mercury analogue", "actual_r": 0.38,
     "data": {"koi_period": 88.0, "koi_depth": 12.0, "koi_duration": 3.0,
              "koi_steff": 5778, "koi_srad": 1.0, "koi_score": 0.6}},
    {"name": "Kepler-37b (smallest known)", "actual_r": 0.30,
     "data": {"koi_period": 13.37, "koi_depth": 8.0, "koi_duration": 1.8,
              "koi_steff": 5357, "koi_srad": 0.77, "koi_score": 0.75}},
    {"name": "Mars analogue", "actual_r": 0.53,
     "data": {"koi_period": 687.0, "koi_depth": 25.0, "koi_duration": 5.0,
              "koi_steff": 5778, "koi_srad": 1.0, "koi_score": 0.70}},

    # ── EARTH-LIKE (0.8–1.25 R⊕) ──
    {"name": "Venus analogue", "actual_r": 0.95,
     "data": {"koi_period": 224.7, "koi_depth": 76.0, "koi_duration": 5.5,
              "koi_steff": 5778, "koi_srad": 1.0, "koi_score": 0.82}},
    {"name": "Earth (exact)", "actual_r": 1.0,
     "data": {"koi_period": 365.25, "koi_depth": 84.0, "koi_duration": 6.0,
              "koi_steff": 5778, "koi_srad": 1.0, "koi_score": 0.90}},
    {"name": "Kepler-186f (HZ Earth-size)", "actual_r": 1.17,
     "data": {"koi_period": 129.9, "koi_depth": 340.0, "koi_duration": 4.5,
              "koi_steff": 3755, "koi_srad": 0.47, "koi_score": 0.88}},
    {"name": "Kepler-438b (HZ rocky)", "actual_r": 1.12,
     "data": {"koi_period": 35.23, "koi_depth": 475.0, "koi_duration": 2.8,
              "koi_steff": 3748, "koi_srad": 0.44, "koi_score": 0.90}},

    # ── SUPER-EARTH (1.25–2.0 R⊕) ──
    {"name": "Kepler-442b", "actual_r": 1.34,
     "data": {"koi_period": 112.3, "koi_depth": 250.0, "koi_duration": 5.0,
              "koi_steff": 4402, "koi_srad": 0.60, "koi_score": 0.85}},
    {"name": "Kepler-452b", "actual_r": 1.63,
     "data": {"koi_period": 384.843, "koi_depth": 197.0, "koi_duration": 9.1,
              "koi_steff": 5757, "koi_srad": 1.11, "koi_score": 0.88}},
    {"name": "Kepler-62f", "actual_r": 1.41,
     "data": {"koi_period": 267.29, "koi_depth": 370.0, "koi_duration": 6.9,
              "koi_steff": 4869, "koi_srad": 0.64, "koi_score": 0.86}},

    # ── MINI-NEPTUNE (2.0–4.0 R⊕) ──
    {"name": "Kepler-22b", "actual_r": 2.38,
     "data": {"koi_period": 289.862, "koi_depth": 492.0, "koi_duration": 7.4,
              "koi_steff": 5518, "koi_srad": 0.979, "koi_score": 0.944}},
    {"name": "GJ 1214b (water world)", "actual_r": 2.68,
     "data": {"koi_period": 1.58, "koi_depth": 1500.0, "koi_duration": 0.85,
              "koi_steff": 3026, "koi_srad": 0.21, "koi_score": 0.95}},
    {"name": "Kepler-11f", "actual_r": 2.61,
     "data": {"koi_period": 46.69, "koi_depth": 590.0, "koi_duration": 4.0,
              "koi_steff": 5680, "koi_srad": 1.065, "koi_score": 0.85}},

    # ── NEPTUNE-LIKE (4.0–10.0 R⊕) ──
    {"name": "HAT-P-11b (warm Neptune)", "actual_r": 4.36,
     "data": {"koi_period": 4.888, "koi_depth": 4200.0, "koi_duration": 2.3,
              "koi_steff": 4780, "koi_srad": 0.75, "koi_score": 0.92}},
    {"name": "Kepler-101b", "actual_r": 5.77,
     "data": {"koi_period": 3.49, "koi_depth": 3000.0, "koi_duration": 2.0,
              "koi_steff": 5667, "koi_srad": 1.29, "koi_score": 0.80}},

    # ── GAS GIANT (>10.0 R⊕) ──
    {"name": "Jupiter analogue", "actual_r": 11.2,
     "data": {"koi_period": 4333.0, "koi_depth": 10500.0, "koi_duration": 15.0,
              "koi_steff": 5778, "koi_srad": 1.0, "koi_score": 0.4}},
    {"name": "Hot Jupiter (HD 209458b)", "actual_r": 15.1,
     "data": {"koi_period": 3.52, "koi_depth": 15000.0, "koi_duration": 2.5,
              "koi_steff": 6000, "koi_srad": 1.2, "koi_score": 0.3}},
    {"name": "WASP-79b (inflated giant)", "actual_r": 22.0,
     "data": {"koi_period": 3.66, "koi_depth": 23000.0, "koi_duration": 3.5,
              "koi_steff": 6600, "koi_srad": 1.64, "koi_score": 0.35}},
]

header = (f"{'Planet':<35s} {'Actual':>7s} {'Predicted':>9s} {'Physics':>8s}"
          f" {'ML Avg':>7s} {'Error%':>7s}  {'Type':<15s} {'Class':<15s}")
print(header)
print("=" * 120)

errors_by_bin = {}
for t in tests:
    r = requests.post(BASE, json=t["data"]).json()
    if "error" in r:
        print(f"  {t['name']:<35s}  ERROR: {r['error']}")
        continue
    pred = r["predicted_radius"]
    actual = t["actual_r"]
    err = abs(pred - actual) / actual * 100

    # Bin for summary
    if actual < 0.8:
        b = "Sub-Earth (<0.8)"
    elif actual <= 1.25:
        b = "Earth-like (0.8-1.25)"
    elif actual <= 2.0:
        b = "Super-Earth (1.25-2)"
    elif actual <= 4.0:
        b = "Mini-Neptune (2-4)"
    elif actual <= 10.0:
        b = "Neptune-like (4-10)"
    else:
        b = "Gas Giant (>10)"
    errors_by_bin.setdefault(b, []).append(err)

    print(f"  {t['name']:<35s} {actual:>7.2f} {pred:>9.4f} {r['physics_radius']:>8.4f}"
          f" {r['ml_avg_radius']:>7.4f} {err:>6.1f}%  {r['planet_type']:<15s} {r['prediction']:<15s}")

print("\n" + "=" * 120)
print("\n  SUMMARY BY SIZE CLASS:")
print(f"  {'Bin':<25s} {'Tests':>5s} {'Avg Error%':>10s} {'Max Error%':>10s}")
print("  " + "-" * 55)
for b, errs in errors_by_bin.items():
    avg = sum(errs) / len(errs)
    mx = max(errs)
    print(f"  {b:<25s} {len(errs):>5d} {avg:>9.1f}% {mx:>9.1f}%")

overall = [e for errs in errors_by_bin.values() for e in errs]
print(f"\n  {'OVERALL':<25s} {len(overall):>5d} {sum(overall)/len(overall):>9.1f}% {max(overall):>9.1f}%")
