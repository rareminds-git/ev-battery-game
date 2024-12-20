import { Level } from '../types/game';

export const levels: Level[] = [
  {
    id: 1,
    title: "Rapid Discharge During Operation",
    symptoms: "Discharges quickly after full charge.",
    clues: "Normal temperature, uneven cell voltages.",
    resolution: "Cell balancing, inspecting connectors, and checking the BMS."
  },
  {
    id: 2,
    title: "Overheating After Prolonged Use",
    symptoms: "High temperature during extended driving.",
    clues: "Abnormal thermal readings, rapid fan cycling.",
    resolution: "Clean cooling system, replace temperature sensors."
  },
  {
    id: 3,
    title: "Uneven Charging Across Cells",
    symptoms: "Cells exhibit varying voltages after charging.",
    clues: "One cell group has significantly lower voltage.",
    resolution: "Balance cells, replace faulty cells, calibrate the BMS."
  },
  {
    id: 4,
    title: "Failure to Charge Beyond 80%",
    symptoms: "Charging halts at 80% capacity.",
    clues: "Fault code on display, normal temperature.",
    resolution: "Update battery software, recalibrate charging parameters."
  },
  {
    id: 5,
    title: "Slow Charging Rate",
    symptoms: "Charging takes longer than expected.",
    clues: "Charger compatibility issues.",
    resolution: "Verify charger settings, inspect power connectors."
  },
  {
    id: 6,
    title: "BMS Sensor Malfunction",
    symptoms: "Inaccurate state of charge (SOC) readings.",
    clues: "Inconsistent voltage readings from the BMS.",
    resolution: "Replace faulty sensors, recalibrate the BMS."
  },
  {
    id: 7,
    title: "Thermal Runaway",
    symptoms: "Sudden overheating and smoke.",
    clues: "Faulty cooling system, abnormal current flow.",
    resolution: "Isolate faulty cells, inspect the cooling system."
  },
  {
    id: 8,
    title: "High Self-Discharge",
    symptoms: "Battery drains significantly when idle.",
    clues: "Normal temperature, parasitic loads detected.",
    resolution: "Identify and remove parasitic loads, replace degraded cells."
  },
  {
    id: 9,
    title: "Voltage Spike During Charging",
    symptoms: "Unusual voltage spike causing charging to stop.",
    clues: "Faulty charger, abnormal power input.",
    resolution: "Inspect the charger, verify power input levels."
  },
  {
    id: 10,
    title: "Capacity Degradation",
    symptoms: "Reduced driving range over time.",
    clues: "Normal charging, uneven capacity retention across cells.",
    resolution: "Replace degraded cells, balance battery packs."
  },
  {
    id: 11,
    title: "Sudden Power Loss During Operation",
    symptoms: "EV shuts down without warning.",
    clues: "Abnormal BMS communication, power relay fault.",
    resolution: "Inspect BMS communication modules, replace power relays."
  },
  {
    id: 12,
    title: "Intermittent Charging Failure",
    symptoms: "Charging stops intermittently.",
    clues: "Loose charging port connections, environmental interference.",
    resolution: "Secure connections, ensure environmental shielding."
  },
  {
    id: 13,
    title: "Unusual Noise During Operation",
    symptoms: "Whining or buzzing sound.",
    clues: "Faulty cooling fans or inverters.",
    resolution: "Inspect cooling fans, diagnose inverters."
  },
  {
    id: 14,
    title: "Charger Incompatibility",
    symptoms: "EV fails to charge at certain public stations.",
    clues: "Charger protocol mismatch.",
    resolution: "Verify protocol compatibility, update firmware."
  },
  {
    id: 15,
    title: "Fault Code Without Symptoms",
    symptoms: "No apparent operational issues, but fault code displayed.",
    clues: "Minor BMS update required.",
    resolution: "Perform software diagnostics, update BMS."
  }
];