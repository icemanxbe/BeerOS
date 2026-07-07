#!/usr/bin/env python3
"""Verifies server.py's telemetry normalization against real, verified device
JSON shapes (iSpindel/GravityMon native + Brewfather Custom Stream — see
server.py's module docstring for the exact sources). Run: python3 server.test.py
"""
import server

failures = 0


def check(label, got, expected, tol=None):
    global failures
    ok = (abs(got - expected) <= tol) if tol is not None else (got == expected)
    print(f"{'PASS' if ok else 'FAIL'}  {label}: got {got}, expected {expected}")
    if not ok:
        failures += 1


# iSpindel/GravityMon native shape (verified example payload)
ispindel_body = {
    "name": "gravmon", "ID": "2E6753", "token": "gravmon", "interval": 900,
    "temperature": 20.5, "temp_units": "C", "gravity": 1.0050, "angle": 45.34,
    "battery": 3.67, "RSSI": -12, "corr-gravity": 1.0060, "gravity-unit": "G", "run-time": 6
}
r = server.normalize_telemetry(ispindel_body)
check("iSpindel shape: device_name", r["device_name"], "gravmon")
check("iSpindel shape: uses corr-gravity over gravity", r["sg"], 1.0060, 0.0001)
check("iSpindel shape: temp passthrough C", r["temp_c"], 20.5, 0.01)
check("iSpindel shape: source tag", r["source"], "ispindel")

# Brewfather Custom Stream shape (verified example payload)
brewfather_body = {
    "name": "YourDeviceName", "temp": 20.32, "temp_unit": "C",
    "gravity": 1.042, "gravity_unit": "G", "battery": 4.98
}
r = server.normalize_telemetry(brewfather_body)
check("Brewfather shape: device_name", r["device_name"], "YourDeviceName")
check("Brewfather shape: sg", r["sg"], 1.042, 0.0001)
check("Brewfather shape: temp_c", r["temp_c"], 20.32, 0.01)

# Fahrenheit conversion
r = server.normalize_telemetry({"name": "d1", "temp": 68.0, "temp_unit": "F", "gravity": 1.050})
check("Fahrenheit -> Celsius", r["temp_c"], 20.0, 0.01)

# Plato gravity unit conversion (round-trips through the same verified cubic as calculators.js)
r = server.normalize_telemetry({"name": "d1", "temp": 20, "temp_unit": "C", "gravity": 12.39, "gravity_unit": "P"})
check("Plato -> SG conversion", r["sg"], 1.050, 0.001)

# Missing device name -> rejected
check("missing name -> None", server.normalize_telemetry({"temp": 20, "gravity": 1.050}) is None, True)

# Missing gravity -> rejected (nothing useful to log)
check("missing gravity -> None", server.normalize_telemetry({"name": "d1", "temp": 20}) is None, True)

# plato_to_sg round-trip
check("plato_to_sg round-trip", server.plato_to_sg(server.sg_to_plato(1.065)), 1.065, 0.0001)

print(f"\n{'ALL PASS' if failures == 0 else str(failures) + ' FAILURE(S)'}")
exit(0 if failures == 0 else 1)
