import { Department, Doctor, Testimonial, HospitalFacility, Appointment } from '../types';

export const DEPARTMENTS: Department[] = [
  // ==========================================
  // MEDICAL SPECIALIST (10 DEPARTMENTS)
  // ==========================================
  {
    id: 'cardiology',
    name: 'Cardiology',
    displayName: 'Cardiology',
    image: './images/dept_cardiology_1792925477920.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Comprehensive cardiac science, catheterization, and rhythm care',
    cardDesc: 'Interventional cardiology, non-invasive imaging, heart failure, and arrhythmia care.',
    shortDesc: 'State-of-the-art biplane cath labs, cardiac MRI, electrophysiology, and advanced coronary therapeutics.',
    fullDesc: 'WeCare Cardiology delivers world-class cardiovascular medicine, combining biplane coronary interventions, electrophysiology mapping, heart failure therapies, and intensive cardiac rehabilitation.',
    headOfDepartment: 'Dr. Marcus Vance, MD, FACC, FSCAI',
    phoneExtension: 'Ext. 3020 / Hotline: 1-800-CARDIO',
    floor: 'Level 3, Heart & Vascular Tower',
    bedCapacity: 48,
    keyProcedures: [
      'Primary Percutaneous Coronary Intervention (PCI)',
      '3D Electrophysiology Mapping & RF Ablation',
      'Transcatheter Aortic Valve Implantation (TAVI/TAVR)',
      'Pacemaker & Subcutaneous ICD Implantation'
    ],
    keyEquipments: [
      'Siemens Artis zee Biplane Cath Lab',
      'CARTO 3 3D Cardiac Mapping System',
      'GE Vivid E95 4D Echocardiography',
      'Philips 3.0T Cardiac MRI'
    ],
    doctorIds: ['doc-vance', 'doc-rostova'],
    stats: [
      { label: 'PCI Success Rate', value: '99.4%' },
      { label: 'Door-to-Balloon Time', value: '< 45 mins' },
      { label: 'Annual Heart Procedures', value: '4,200+' }
    ]
  },
  {
    id: 'neurology',
    name: 'Neurology',
    displayName: 'Neurology',
    image: './images/dept_neurology_1792925478967.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Advanced clinical neuroscience, comprehensive stroke management & neuro-immunology',
    cardDesc: 'Specialized diagnosis and treatment for epilepsy, stroke, dementia, Parkinson’s, and neuromuscular disorders.',
    shortDesc: 'Comprehensive stroke care, high-density EEG, EMG nerve conduction, and clinical neuro-immunology.',
    fullDesc: 'Our Neurology team provides advanced non-surgical neurological diagnostics and therapies, including hyper-acute stroke thrombolysis, long-term video-EEG telemetry, botulinum toxin for movement disorders, and memory care.',
    headOfDepartment: 'Dr. Sarah Jenkins, MD, FAAN',
    phoneExtension: 'Ext. 4010',
    floor: 'Level 4, Neurosciences Wing',
    bedCapacity: 38,
    keyProcedures: [
      'Hyper-Acute Ischemic Stroke Thrombolysis (IV tPA / TNK)',
      'Continuous Long-Term Video-EEG Telemetry',
      'EMG / Nerve Conduction Velocity (NCV) Studies',
      'Therapeutic Botulinum Toxin for Dystonia & Spasticity'
    ],
    keyEquipments: [
      'Nihon Kohden 128-Channel Video EEG',
      'Cadwell Sierra Summit EMG/NCV Station',
      'Transcranial Doppler (TCD) Ultrasound',
      'Siemens Magnetom Vida 3T Neuro MRI'
    ],
    doctorIds: ['doc-jenkins', 'doc-patel'],
    stats: [
      { label: 'Stroke Thrombolysis Door-to-Needle', value: '< 30 mins' },
      { label: 'Neurology Patients Managed', value: '11,500+' },
      { label: 'Diagnostic Accuracy', value: '99.1%' }
    ]
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    displayName: 'Gastroenterology',
    image: './images/wecare_doctor_consultation_1792924565292.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Advanced digestive health, hepatology & therapeutic endoscopy suites',
    cardDesc: 'Expert medical care for liver cirrhosis, hepatitis, IBD, Barrett’s esophagus, and digestive wellness.',
    shortDesc: 'High-definition video endoscopy, endoscopic ultrasound, motility studies, and chronic liver care.',
    fullDesc: 'WeCare Gastroenterology & Hepatology offers end-to-end medical evaluation and therapeutic interventions for gastrointestinal and liver disorders, utilizing narrow-band imaging endoscopy, FibroScan, and biological therapies for Crohn’s and ulcerative colitis.',
    headOfDepartment: 'Dr. Kenneth O’Connor, MD, FACG, FASGE',
    phoneExtension: 'Ext. 4120',
    floor: 'Level 4, Digestive Health Center',
    bedCapacity: 32,
    keyProcedures: [
      'High-Definition Diagnostic & Screening Colonoscopy',
      'Therapeutic ERCP & Biliary Sphincterotomy',
      'Endoscopic Ultrasound (EUS) & Fine Needle Biopsy',
      'FibroScan Transient Elastography for Liver Fibrosis'
    ],
    keyEquipments: [
      'Olympus EVIS X1 Endoscopy System with TXI',
      'Echosens FibroScan 630 Expert',
      'Pentax Medical Ultrasound Endoscope',
      'High-Resolution Esophageal Manometry Suite'
    ],
    doctorIds: ['doc-oconnor', 'doc-rao'],
    stats: [
      { label: 'Annual Endoscopies', value: '7,800+' },
      { label: 'Adenoma Detection Rate', value: '44%' },
      { label: 'Complication Rate', value: '< 0.08%' }
    ]
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    displayName: 'Pulmonology',
    image: './images/wecare_medical_team_1792924563947.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Comprehensive respiratory medicine, interventional bronchoscopy & sleep labs',
    cardDesc: 'Treatment for asthma, COPD, pulmonary fibrosis, sleep apnea, and complex lung infections.',
    shortDesc: 'State-of-the-art pulmonary function testing, EBUS bronchoscopy, sleep study labs, and respiratory allergy care.',
    fullDesc: 'WeCare Pulmonology specializes in chronic respiratory disease management, interventional endobronchial ultrasound (EBUS), advanced allergy diagnostics, and high-flow pulmonary rehabilitation programs.',
    headOfDepartment: 'Dr. Gregory Clark, MD, FCCP',
    phoneExtension: 'Ext. 3140',
    floor: 'Level 3, Respiratory & Chest Clinic',
    bedCapacity: 28,
    keyProcedures: [
      'Endobronchial Ultrasound (EBUS-TBNA) Mediastinal Staging',
      'Complete Pulmonary Function Testing (PFT) & DLCO',
      'Polysomnography Overnight Sleep Study Analysis',
      'Therapeutic Bronchoalveolar Lavage (BAL) & Biopsy'
    ],
    keyEquipments: [
      'Olympus BF-UC190F EBUS Bronchoscope',
      'Jaeger MasterScreen Pulmonary Testing Cabin',
      'SomnoMedics 32-Channel Polysomnography Lab',
      'Hamilton High-Flow Nasal Cannula Oxygen Systems'
    ],
    doctorIds: ['doc-pulmo-clark', 'doc-pulmo-williams'],
    stats: [
      { label: 'Annual PFT Evaluations', value: '5,400+' },
      { label: 'EBUS Diagnostic Yield', value: '94.8%' },
      { label: 'Asthma Stabilization Rate', value: '98.2%' }
    ]
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology',
    displayName: 'Endocrinology',
    image: './images/wecare_modern_facility_1792924563210.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Precision metabolic wellness, diabetes reversal & hormonal disorders',
    cardDesc: 'Specialized care for type 1 & 2 diabetes, thyroid conditions, pituitary & adrenal disorders, and osteoporosis.',
    shortDesc: 'Continuous glucose monitoring, insulin pump therapy, thyroid ultrasound FNAC, and bone density management.',
    fullDesc: 'WeCare Endocrinology provides holistic hormonal balance and metabolic wellness. We integrate closed-loop continuous glucose monitoring, metabolic syndrome management, adrenal and pituitary testing, and comprehensive thyroid nodules care.',
    headOfDepartment: 'Dr. Meera Sharma, MD, FACE',
    phoneExtension: 'Ext. 2280',
    floor: 'Level 2, Metabolic & Endocrine Pavilion',
    bedCapacity: 20,
    keyProcedures: [
      'Continuous Glucose Monitoring (CGM) Sensor Profiling',
      'Automated Insulin Delivery & Smart Pump Optimization',
      'Ultrasound-Guided Thyroid Fine Needle Aspiration (FNAC)',
      'Dual-Energy X-Ray Absorptiometry (DEXA) Bone Profiling'
    ],
    keyEquipments: [
      'GE Lunar Prodigy Bone Densitometer (DEXA)',
      'Dexcom G7 Continuous Glucose Analytics Hub',
      'Mindray DC-80 High-Resolution Thyroid Ultrasound',
      'Automated Chemiluminescence Hormone Immunoanalyzer'
    ],
    doctorIds: ['doc-endo-sharma', 'doc-endo-harris'],
    stats: [
      { label: 'HbA1c Target Attainment', value: '88.5%' },
      { label: 'Diabetic Patients Monitored', value: '9,200+' },
      { label: 'Thyroid Biopsy Precision', value: '99.2%' }
    ]
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    displayName: 'Dermatology',
    image: './images/wecare_hospital_exterior_1792924562478.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Advanced clinical dermatology, cutaneous immunology & phototherapy',
    cardDesc: 'Diagnosis and medical management of eczema, psoriasis, acne, skin allergies, and autoimmune skin conditions.',
    shortDesc: 'Digital dermoscopy, narrow-band UVB phototherapy, patch testing, and medical cryotherapy.',
    fullDesc: 'Our Dermatology department offers comprehensive clinical skin evaluations, specialized biologic therapies for chronic plaque psoriasis, digital dermatoscopic mole mapping for melanoma screening, and targeted phototherapy.',
    headOfDepartment: 'Dr. Rebecca Ross, MD, FAAD',
    phoneExtension: 'Ext. 2190',
    floor: 'Level 2, Dermatology & Skin Science Wing',
    bedCapacity: 14,
    keyProcedures: [
      'Digital Dermoscopy & Automated Mole Mapping',
      'Narrowband UVB Whole-Body Phototherapy',
      'Standardized TRUE Patch Testing for Contact Dermatitis',
      'Diagnostic Punch Biopsies & Cryosurgical Ablation'
    ],
    keyEquipments: [
      'FotoFinder bodystudio Automated Total Body Dermoscopy',
      'Waldmann UV 7002 Phototherapy Cabin',
      'Brymill Liquid Nitrogen Cryosurgery Systems',
      'Deka SmartXide Fractional Medical Laser'
    ],
    doctorIds: ['doc-derma-ross', 'doc-derma-kim'],
    stats: [
      { label: 'Skin Screenings Completed', value: '6,100+' },
      { label: 'Psoriasis Clearance Rate', value: '92.4%' },
      { label: 'Early Melanoma Detection', value: '99.6%' }
    ]
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    displayName: 'Nephrology',
    image: './images/wecare_doctor_consultation_1792924565292.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Comprehensive renal medicine, modern hemodialysis & kidney transplantation care',
    cardDesc: 'Expert medical management of acute kidney injury, chronic kidney disease (CKD), and dialysis.',
    shortDesc: '30-bed state-of-the-art dialysis suites, CRRT for ICU patients, and renal transplant medical protocols.',
    fullDesc: 'WeCare Nephrology delivers compassionate care for all stages of renal disease. With online hemodiafiltration (HDF), automated peritoneal dialysis training, and dedicated post-transplant immunosuppression clinics, our nephrologists safeguard vital kidney health.',
    headOfDepartment: 'Dr. Tariq Hasan, MD, DM, FASN',
    phoneExtension: 'Ext. 3150',
    floor: 'Level 3, Renal & Dialysis Pavilion',
    bedCapacity: 34,
    keyProcedures: [
      'High-Flux Online Hemodiafiltration (HDF)',
      'Continuous Renal Replacement Therapy (CRRT) in ICU',
      'Ultrasound-Guided Real-Time Native Kidney Biopsy',
      'Pre- & Post-Renal Transplant Immunosuppressive Management'
    ],
    keyEquipments: [
      'Fresenius 5008S CorDiax Dialysis Stations (30 units)',
      'Baxter Prismaflex CRRT Systems',
      'Double-Pass RO Ultrapure Water Purification Plant',
      'Ultrasound Vascular Doppler for AV Fistula Surveillance'
    ],
    doctorIds: ['doc-hasan-nephro', 'doc-nephro-davis'],
    stats: [
      { label: 'Monthly Dialysis Sessions', value: '1,800+' },
      { label: 'Dialysis Adequacy (Kt/V)', value: '1.45 avg' },
      { label: 'Transplant 5-Yr Survival', value: '96.2%' }
    ]
  },
  {
    id: 'oncology',
    name: 'Oncology',
    displayName: 'Oncology',
    image: './images/wecare_medical_team_1792924563947.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Comprehensive cancer institute, precision immunotherapy & tumor genomics',
    cardDesc: 'Compassionate medical oncology, precision targeted therapy, and chemotherapy infusion suites.',
    shortDesc: 'Next-generation genomic sequencing, outpatient chemotherapy lounge, multidisciplinary tumor boards.',
    fullDesc: 'WeCare Oncology is dedicated to defeating cancer through personalized genomic therapies, immunotherapy infusions, supportive palliative care, and multidisciplinary tumor boards collaborating on every individual patient journey.',
    headOfDepartment: 'Dr. Julian Voss, MD, PhD, FACP',
    phoneExtension: 'Ext. 1120 / Oncology Helpline: 1-800-ONCO-CARE',
    floor: 'Level 1 & 2, Comprehensive Cancer Center',
    bedCapacity: 50,
    keyProcedures: [
      'Targeted Molecular Therapy & Immune Checkpoint Blockade',
      'Comprehensive Genomic Tumor Profiling (NGS)',
      'Daycare Chemotherapy Infusion with Scalp Cooling',
      'Multidisciplinary Tumor Board Consultation'
    ],
    keyEquipments: [
      'Illumina NextSeq 550 Dx Clinical Genomic Sequencer',
      'DigniCap Scalp Hypothermia System for Hair Preservation',
      'Class II Type B2 Biological Safety Cytotoxic Isolators',
      'Elekta Versa HD High-Definition Linear Accelerator'
    ],
    doctorIds: ['doc-voss', 'doc-raman', 'doc-adebayo'],
    stats: [
      { label: '5-Year Overall Survival vs Benchmark', value: '+14%' },
      { label: 'Annual Chemotherapy Cycles', value: '8,400+' },
      { label: 'Tumor Board Cases Discussed', value: '1,200+' }
    ]
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry',
    displayName: 'Psychiatry',
    image: './images/wecare_modern_facility_1792924563210.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Compassionate behavioral health, neuro-psychiatry & evidence-based therapies',
    cardDesc: 'Clinical management for depression, anxiety disorders, bipolar condition, ADHD, and psychotherapy.',
    shortDesc: 'Repetitive Transcranial Magnetic Stimulation (rTMS), clinical neuropsychology, and adolescent psychiatry.',
    fullDesc: 'WeCare Psychiatry & Behavioral Health provides confidential, stigma-free mental health care. Our multidisciplinary specialists offer evidence-based psychopharmacology, FDA-cleared rTMS for treatment-resistant depression, and cognitive behavioral therapies.',
    headOfDepartment: 'Dr. Hannah Aris, MD, DFAPA',
    phoneExtension: 'Ext. 3100',
    floor: 'Level 3, Mind & Behavioral Health Pavilion',
    bedCapacity: 24,
    keyProcedures: [
      'Repetitive Transcranial Magnetic Stimulation (rTMS)',
      'Comprehensive Neuropsychological Cognitive Assessments',
      'Cognitive Behavioral Therapy (CBT) & DBT Protocols',
      'Adult & Adolescent Psycho-Pharmacotherapy'
    ],
    keyEquipments: [
      'MagVenture MagPro R30 Clinical rTMS System',
      'Biofeedback & Neuro-Feedback Brain Gym Suite',
      'Computerized Cambridge Neuropsychological Test (CANTAB)',
      'Acoustically Isolated Psychotherapy Consult Chambers'
    ],
    doctorIds: ['doc-aris-psych', 'doc-ross-psych'],
    stats: [
      { label: 'rTMS Clinical Response Rate', value: '74.2%' },
      { label: 'Annual Consultations', value: '4,800+' },
      { label: 'Patient Privacy Rating', value: '100%' }
    ]
  },
  {
    id: 'gynecology',
    name: 'Obstetrics & Gynecology (OB/GYN)',
    displayName: 'Obstetrics & Gynecology (OB/GYN)',
    image: './images/dept_pediatrics_1792925480340.jpg',
    category: 'medical',
    isBookable: true,
    tagline: 'Dedicated women’s health, high-risk maternal-fetal medicine & luxury birthing suites',
    cardDesc: 'Complete obstetric care, painless labor, fetal medicine scans, and gynecological wellness.',
    shortDesc: 'LDR birthing suites, 4D anomaly scans, painless labor epidural protocols, and women’s hormone clinic.',
    fullDesc: 'WeCare Obstetrics & Gynecology delivers lifelong clinical support for women, from high-risk prenatal maternal-fetal assessments and luxury LDR (Labor, Delivery, Recovery) suites to advanced hormone replacement and reproductive health care.',
    headOfDepartment: 'Dr. Rebecca Klein, MD, FACOG',
    phoneExtension: 'Ext. 3110 / Birthing Desk: 1-800-BIRTH-NOW',
    floor: 'Level 3, Women & Infant Tower',
    bedCapacity: 45,
    keyProcedures: [
      'Advanced 4D Fetal Anomaly Ultrasound & First-Trimester Screen',
      '24/7 Painless Labor Epidural Delivery Protocol',
      'Non-Invasive Prenatal Cell-Free DNA Genetic Testing (NIPT)',
      'Postpartum Maternal Health & Lactation Consultation'
    ],
    keyEquipments: [
      'GE Voluson E10 BT21 4D High-Definition Ultrasound',
      'Hill-Rom Affinity 4 Luxury Birthing Beds',
      'Philips Avalon FM30 Dual Fetal Heart Monitors',
      'Olympus 3D HD Hysteroscopy Tower'
    ],
    doctorIds: ['doc-klein', 'doc-desai', 'doc-brooks'],
    stats: [
      { label: 'Safe Deliveries Conducted', value: '18,000+' },
      { label: 'Normal Delivery Success Rate', value: '78.5%' },
      { label: 'Maternal Safety Index', value: '99.9%' }
    ]
  },

  // ==========================================
  // SURGICAL SPECIALIST (8 DEPARTMENTS)
  // ==========================================
  {
    id: 'general_surgery',
    name: 'General Surgery',
    displayName: 'General Surgery',
    image: './images/wecare_doctor_consultation_1792924565292.jpg',
    category: 'surgical',
    isBookable: true,
    tagline: 'Minimally invasive keyhole procedures, acute abdominal surgery & bariatrics',
    cardDesc: 'Laparoscopic cholecystectomy, hernia repair, appendectomy, and gastrointestinal surgical procedures.',
    shortDesc: '4K Ultra-HD laparoscopy, 3D ventral hernia repair, day-surgery suite, and emergency trauma laparotomy.',
    fullDesc: 'The Department of General Surgery provides expert operative care utilizing advanced 4K minimally invasive laparoscopy. From gallbladder and complicated hernia reconstructions to bariatric metabolic surgery, we prioritize rapid recovery and minimal pain.',
    headOfDepartment: 'Dr. Jonathan Reynolds, MD, FACS, FASMBS',
    phoneExtension: 'Ext. 2050',
    floor: 'Level 2, Surgical Complex A',
    bedCapacity: 40,
    keyProcedures: [
      'Laparoscopic Cholecystectomy & Choledochoscopy',
      'Complex Abdominal Wall Hernia Reconstruction (eTEP)',
      'Laparoscopic Appendectomy & Bowel Resection',
      'Thyroidectomy & Parathyroid Micro-Surgery'
    ],
    keyEquipments: [
      'Stryker 1688 AIM 4K Fluorescent Laparoscopy Tower',
      'Medtronic LigaSure & Harmonic Ultrasonic Scalpel',
      'Steris HarmonyAIR Modular Surgical Lighting',
      'Daycare Short-Stay Ambulatory Recovery Pods'
    ],
    doctorIds: ['doc-reynolds-gen', 'doc-kaufman-gen'],
    stats: [
      { label: 'Laparoscopic Surgeries', value: '6,500+' },
      { label: 'Average Hospital Stay', value: '< 24 hrs' },
      { label: 'Surgical Site Infection', value: '< 0.15%' }
    ]
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    displayName: 'Orthopedics',
    image: './images/dept_orthopedics_1792925479127.jpg',
    category: 'surgical',
    isBookable: true,
    tagline: 'Robotic joint replacement, arthroscopic sports medicine & complex fractures',
    cardDesc: 'Total knee and hip replacement, arthroscopic ligament reconstruction, and spine surgery.',
    shortDesc: 'Mako robotic arm joint replacement, sports injury arthroscopy, and 24/7 complex pelvic fracture care.',
    fullDesc: 'WeCare Orthopedics is a national leader in orthopedic reconstruction, utilizing sub-millimeter robotic precision for knee and hip replacements. Our sports surgeons and trauma specialists return athletes and patients to active, pain-free lives.',
    headOfDepartment: 'Dr. Robert Sterling, MD, FAAOS',
    phoneExtension: 'Ext. 2010',
    floor: 'Level 2, Bone & Joint Institute',
    bedCapacity: 52,
    keyProcedures: [
      'Mako Robotic-Assisted Total Knee & Hip Arthroplasty',
      'Arthroscopic ACL / Meniscal Repair & Cartilage Restoration',
      'Minimally Invasive Endoscopic Spine Decompression',
      'Complex Polytrauma Pelvic & Acetabular Fixation'
    ],
    keyEquipments: [
      'Stryker Mako SmartRobotics Interactive Surgical Arm',
      'Smith & Nephew 4K Werewolf Arthroscopy System',
      'Ziehm Vision RFD 3D Motorized C-Arm',
      'Brainlab Kick Spine Navigation Suite'
    ],
    doctorIds: ['doc-sterling', 'doc-mercier', 'doc-nair'],
    stats: [
      { label: 'Robotic Joint Replacements', value: '4,500+' },
      { label: 'Discharge within 24 Hours', value: '86%' },
      { label: 'Patient Mobility Restoration', value: '98.9%' }
    ]
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery',
    displayName: 'Neurosurgery',
    image: './images/dept_neurology_1792925478967.jpg',
    category: 'surgical',
    isBookable: true,
    tagline: 'Micro-neurosurgery, cranial skull base navigation & robotic spine reconstruction',
    cardDesc: 'Surgical treatment for brain tumors, aneurysm clipping, intracranial hematomas, and spinal stabilization.',
    shortDesc: 'Neuronavigation intraoperative CT, robotic spine stabilization, and awake craniotomy micro-resection.',
    fullDesc: 'Our Neurosurgical Institute performs intricate brain and spine operations using ultra-precise operative microscopes and real-time intraoperative neuronavigation. We specialize in skull base tumors, cerebral aneurysm repairs, and robotic spine instrumentation.',
    headOfDepartment: 'Dr. David Chen, MD, PhD, FAANS',
    phoneExtension: 'Ext. 4040',
    floor: 'Level 4, Neurosciences Surgical Tower',
    bedCapacity: 30,
    keyProcedures: [
      'Image-Guided Brain Tumor Microsurgical Resection',
      'Endovascular Aneurysm Coiling & Surgical Micro-Clipping',
      'Robotic Minimally Invasive Spine Fusion (MIS-TLIF)',
      'Awake Craniotomy with Intraoperative Neuro-Monitoring'
    ],
    keyEquipments: [
      'Zeiss KINEVO 900 Robotic Visualization Microscope',
      'Medtronic StealthStation S8 Surgical Navigation',
      'Brainlab Airo Mobile Intraoperative 32-Slice CT',
      'Cadwell Cascade Pro Intraoperative Neuro-Monitoring'
    ],
    doctorIds: ['doc-chen', 'doc-neuro-morris'],
    stats: [
      { label: 'Cranial Microsurgeries', value: '2,900+' },
      { label: 'Neurosurgical Accuracy', value: 'Sub-millimeter' },
      { label: 'Complication Rate', value: '< 1.1%' }
    ]
  },
  {
    id: 'cardiothoracic_surgery',
    name: 'Cardiothoracic Surgery',
    displayName: 'Cardiothoracic Surgery',
    image: './images/dept_cardiology_1792925477920.jpg',
    category: 'surgical',
    isBookable: true,
    tagline: 'Open-heart surgery, beating-heart CABG, aortic repair & thoracic resections',
    cardDesc: 'Coronary artery bypass grafting (CABG), heart valve repair/replacement, aortic dissection surgery.',
    shortDesc: 'Dedicated cardiac surgical theaters, ECMO cardiopulmonary support, and minimally invasive thoracic surgery.',
    fullDesc: 'WeCare Cardiothoracic Surgery delivers exceptional outcomes in high-complexity heart and lung operations. Our cardiac surgeons routinely perform arterial revascularization on beating hearts, complex aortic root replacements, and lung cancer resections.',
    headOfDepartment: 'Dr. Tariq Al-Mansoor, MS, MCh, FRCS (CTh)',
    phoneExtension: 'Ext. 3080',
    floor: 'Level 3, Cardiac Surgical Suites',
    bedCapacity: 28,
    keyProcedures: [
      'Off-Pump Beating Heart Coronary Artery Bypass (OPCAB)',
      'Minimally Invasive Mitral & Aortic Valve Repair/Replacement',
      'Ascending Aortic Aneurysm & Dissection Repair (Bentall)',
      'Video-Assisted Thoracoscopic Surgery (VATS) Lobectomy'
    ],
    keyEquipments: [
      'Maquet HL 20 Heart-Lung Perfusion System',
      'Getinge Cardiohelp Portable ECMO Unit',
      'Medtronic Octopus Beating-Heart Tissue Stabilizer',
      'St. Jude Medical Epic Porcine & Mechanical Valves'
    ],
    doctorIds: ['doc-almansoor', 'doc-cts-taylor'],
    stats: [
      { label: 'Open-Heart Surgeries', value: '3,200+' },
      { label: 'CABG Operative Survival', value: '98.8%' },
      { label: 'VATS Recovery Speed', value: '3 Days' }
    ]
  },
  {
    id: 'ent',
    name: 'Otolaryngology (ENT)',
    displayName: 'Otolaryngology (ENT)',
    image: './images/wecare_medical_team_1792924563947.jpg',
    category: 'surgical',
    isBookable: true,
    tagline: 'Endoscopic sinus surgery, cochlear implants & micro-laryngeal voice restoration',
    cardDesc: 'Surgical treatment for chronic sinusitis, hearing loss, vocal cord polyps, and head-neck tumors.',
    shortDesc: 'Functional endoscopic sinus surgery (FESS), micro-ear tympanoplasty, sleep apnea surgery, and cochlear implants.',
    fullDesc: 'Our Otolaryngology (Ear, Nose & Throat) surgical team utilizes cutting-edge micro-debriders, navigation-guided sinus surgery, and laser laryngeal tools to treat chronic ear diseases, sinus obstructions, sleep apnea, and pediatric airway issues.',
    headOfDepartment: 'Dr. Christopher Blake, MD, FACS',
    phoneExtension: 'Ext. 4150',
    floor: 'Level 4, ENT & Head-Neck Clinic',
    bedCapacity: 22,
    keyProcedures: [
      'Navigation-Guided Functional Endoscopic Sinus Surgery (FESS)',
      'Microscopic Tympanoplasty & Ossicular Reconstruction',
      'Bionic Cochlear Implantation for Severe Hearing Loss',
      'Micro-Laryngeal Phonosurgery & Coblation Tonsillectomy'
    ],
    keyEquipments: [
      'Medtronic Fusion ENT Optical Neuronavigation System',
      'Karl Storz HD Video Rhinolaryngoscope',
      'Leica M525 F20 Surgical Otologic Microscope',
      'Smith & Nephew Coblator II Head & Neck Plasma Tool'
    ],
    doctorIds: ['doc-blake-ent', 'doc-nathan-ent'],
    stats: [
      { label: 'Successful FESS Procedures', value: '3,800+' },
      { label: 'Cochlear Implant Success', value: '99.1%' },
      { label: 'Daycare ENT Discharge', value: '91%' }
    ]
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    displayName: 'Ophthalmology',
    image: './images/wecare_hospital_exterior_1792924562478.jpg',
    category: 'surgical',
    isBookable: true,
    tagline: 'Laser cataract micro-surgery, vitreo-retinal surgery & corneal transplantation',
    cardDesc: 'Blade-free femtosecond cataract surgery, LASIK vision correction, and diabetic retinal care.',
    shortDesc: 'Zeiss Lumera 700 surgical microscope, Alcon Centurion phacoemulsification, and optical coherence tomography.',
    fullDesc: 'The Ophthalmology Surgical Institute offers state-of-the-art vision restoration. We specialize in blade-free robotic laser cataract removals with premium multifocal lenses, micro-incision vitrectomy for retinal tears, and advanced glaucoma shunt implants.',
    headOfDepartment: 'Dr. Alistair Finch, MD, FRCS (Ophth)',
    phoneExtension: 'Ext. 1200',
    floor: 'Level 1, Eye Institute & Laser Pavilion',
    bedCapacity: 18,
    keyProcedures: [
      'Blade-Free Femtosecond Laser-Assisted Cataract Surgery (FLACS)',
      'Premium Trifocal & Toric Intraocular Lens Implantation',
      '25-Gauge Micro-Incision Vitreo-Retinal Surgery (MIVS)',
      'Corneal Cross-Linking (CXL) & Endothelial Keratoplasty'
    ],
    keyEquipments: [
      'Zeiss OPMI Lumera 700 Surgical Microscope with RESIGHT',
      'Alcon Centurion Vision System with Active Sentry',
      'Zeiss Cirrus 6000 High-Speed Angio-OCT',
      'Alcon LenSx Femtosecond Ophthalmic Laser'
    ],
    doctorIds: ['doc-finch-eye', 'doc-lin-eye'],
    stats: [
      { label: 'Laser Cataracts Completed', value: '10,000+' },
      { label: 'Visual Acuity Restoration (20/20)', value: '97.6%' },
      { label: 'Infection Rate', value: '0.01%' }
    ]
  },
  {
    id: 'urology',
    name: 'Urology',
    displayName: 'Urology',
    image: './images/wecare_modern_facility_1792924563210.jpg',
    category: 'surgical',
    isBookable: true,
    tagline: 'Robotic prostate surgery, laser stone lithotripsy (RIRS) & uro-oncology',
    cardDesc: 'Laser prostatectomy (HoLEP), kidney stone dusting, robotic bladder cancer surgery, and urinary health.',
    shortDesc: '100W Holmium laser, flexible digital ureteroscopy, da Vinci robotic surgery, and male fertility care.',
    fullDesc: 'WeCare Urology delivers minimally invasive surgical excellence for kidney stones, prostate enlargement, and urological malignancies. Our surgeons perform scarless flexible laser stone clearance (RIRS) and nerve-sparing robotic prostatectomies.',
    headOfDepartment: 'Dr. Martin Keller, MD, FACS',
    phoneExtension: 'Ext. 3190',
    floor: 'Level 3, Urology & Kidney Center',
    bedCapacity: 30,
    keyProcedures: [
      'Holmium Laser Enucleation of the Prostate (HoLEP)',
      'Retrograde Intrarenal Surgery (RIRS) & Laser Stone Dusting',
      'Robotic Nerve-Sparing Radical Prostatectomy (RALP)',
      'Percutaneous Nephrolithotomy (Mini-PCNL)'
    ],
    keyEquipments: [
      'Lumenis Pulse 120H Holmium Laser with MOSES 2.0',
      'Olympus URF-V3 Ultra-Slim Digital Flexible Ureteroscope',
      'Intuitive da Vinci Xi Dual-Console Surgical System',
      'Laborie Dorado KT Multi-Channel Urodynamics Unit'
    ],
    doctorIds: ['doc-keller-uro', 'doc-uro-bennett'],
    stats: [
      { label: 'Laser Stone Procedures', value: '4,100+' },
      { label: 'Stone-Free Clearance Rate', value: '97.8%' },
      { label: 'Catheter-Free Within 24 Hrs', value: '92%' }
    ]
  },
  {
    id: 'plastic_surgery',
    name: 'Plastic & Reconstructive Surgery',
    displayName: 'Plastic & Reconstructive Surgery',
    image: './images/wecare_medical_team_1792924563947.jpg',
    category: 'surgical',
    isBookable: true,
    tagline: 'Advanced microvascular reconstruction, post-trauma repair & aesthetic surgery',
    cardDesc: 'Free tissue transfer reconstruction, cleft lip repair, burn rehabilitation, scar revision, and aesthetics.',
    shortDesc: 'Microvascular surgical microscope, body contouring, facial reconstruction, and delicate flap surgery.',
    fullDesc: 'WeCare Plastic & Reconstructive Surgery restores anatomical form and function following trauma, tumor excisions, or congenital conditions. Our board-certified surgeons combine microvascular precision with refined aesthetic principles.',
    headOfDepartment: 'Dr. Elena Valdez, MD, FACS',
    phoneExtension: 'Ext. 2140',
    floor: 'Level 2, Aesthetic & Reconstructive Center',
    bedCapacity: 20,
    keyProcedures: [
      'Free Flap Microvascular Tissue Transfer Reconstruction',
      'Post-Mastectomy DIEP / Implant Breast Reconstruction',
      'Complex Facial Trauma & Soft Tissue Reconstruction',
      'Burn Contracture Release & Micro-Fat Grafting'
    ],
    keyEquipments: [
      'Zeiss Pentero 800 Infrared Fluorescence Microscope',
      'Synthes Maxillofacial Titanium Micro-Plating System',
      'VECTRA H2 3D Photogrammetry Facial Imaging',
      'Body-Jet Pulsed Water-Assisted Liposuction System'
    ],
    doctorIds: ['doc-plastic-valdez', 'doc-plastic-morgan'],
    stats: [
      { label: 'Microvascular Flap Survival', value: '98.7%' },
      { label: 'Complex Reconstructions', value: '1,900+' },
      { label: 'Aesthetic Satisfaction Rate', value: '99.4%' }
    ]
  },

  // ==========================================
  // DIAGNOSTIC & SUPPORT (4 DEPARTMENTS)
  // ==========================================
  {
    id: 'radiology',
    name: 'Radiology',
    displayName: 'Radiology',
    image: './images/wecare_modern_facility_1792924563210.jpg',
    category: 'diagnostic_support',
    isBookable: true,
    tagline: 'Ultra-low radiation 512-slice CT, 3.0T MRI & image-guided diagnostic interventions',
    cardDesc: 'Fast diagnostic imaging: 3T MRI, dual-energy CT, digital mammography, and ultrasound scans.',
    shortDesc: 'Same-day verified reports, sub-millimeter scan slices, and AI-assisted lesion screening.',
    fullDesc: 'WeCare Radiology & Diagnostic Imaging provides rapid and ultra-precise non-invasive imaging. Equipped with 3.0T silent MRI, dual-energy CT, and 3D digital mammography, our certified radiologists ensure accurate and prompt diagnoses.',
    headOfDepartment: 'Dr. Leonard Bernstein, MD, FACR',
    phoneExtension: 'Ext. 1050 / Imaging Desk: 1-800-SCAN-NOW',
    floor: 'Level 1, Central Imaging Pavilion',
    bedCapacity: 12,
    keyProcedures: [
      '3.0T High-Resolution Brain & Musculoskeletal MRI Scans',
      '512-Slice Dual-Source Cardiac CT Coronary Angiogram',
      '3D Digital Breast Tomosynthesis & Vacuum Biopsy',
      'Color Doppler Vascular Scans & Ultrasound-Guided Drainage'
    ],
    keyEquipments: [
      'Siemens Magnetom Vida 3.0T BioMatrix MRI',
      'GE Revolution Apex 512-Slice Spectral CT Scanner',
      'Hologic 3Dimensions 3D Mammography System',
      'Philips EPIQ Elite Premium Diagnostic Ultrasound'
    ],
    doctorIds: ['doc-bernstein-rad', 'doc-dubois-rad'],
    stats: [
      { label: 'Diagnostic Scans Handled', value: '48,000+' },
      { label: 'Emergency Scan Delivery', value: '< 20 mins' },
      { label: 'Radiation Dose Reduction', value: 'Up to 70%' }
    ]
  },
  {
    id: 'pathology',
    name: 'Pathology',
    displayName: 'Pathology',
    image: './images/wecare_doctor_consultation_1792924565292.jpg',
    category: 'diagnostic_support',
    isBookable: true,
    tagline: 'CAP & ISO accredited robotic laboratory medicine & molecular cytogenetics',
    cardDesc: 'Blood panels, histopathology, molecular PCR testing, frozen sections, and biochemistry.',
    shortDesc: 'Automated track blood analyzers, oncologic tissue biopsy histology, and infectious PCR diagnostics.',
    fullDesc: 'Our Pathology & Clinical Laboratory is fully accredited by CAP and ISO 15189. Operating 24/7 with automated pneumatic tube sample delivery and robotic specimen tracks, we provide high-throughput clinical biochemistry, hematology, and surgical histopathology.',
    headOfDepartment: 'Dr. Melissa Thorne, MD, FCAP',
    phoneExtension: 'Ext. 1500 / Lab Hotline: 1-800-LAB-CARE',
    floor: 'Level 1, Diagnostic Laboratories Wing',
    bedCapacity: 10,
    keyProcedures: [
      'Intraoperative Frozen Section Rapid Histopathology (15 mins)',
      'Automated Multiplex Real-Time PCR Infectious Testing',
      'Flow Cytometry 10-Color Hematologic Malignancy Panel',
      'Comprehensive Metabolic & Hormonal Chemiluminescence Panels'
    ],
    keyEquipments: [
      'Roche Cobas 8000 Total Modular Lab Automation Track',
      'Sysmex XN-9100 Automated Hematology Line',
      'Leica CM1950 Cryostat for Frozen Biopsies',
      'Bio-Rad QX200 Droplet Digital PCR System'
    ],
    doctorIds: ['doc-thorne-path', 'doc-singh-path'],
    stats: [
      { label: 'Annual Laboratory Tests', value: '380,000+' },
      { label: 'Routine Turnaround Time', value: '< 90 mins' },
      { label: 'Diagnostic Quality Score', value: '99.98%' }
    ]
  },
  {
    id: 'anesthesiology',
    name: 'Anesthesiology',
    displayName: 'Anesthesiology',
    image: './images/wecare_hospital_exterior_1792924562478.jpg',
    category: 'diagnostic_support',
    isBookable: true,
    tagline: 'Advanced perioperative medicine, targeted regional nerve blocks & pain medicine',
    cardDesc: 'Pre-anesthetic evaluation, ultrasound-guided regional nerve blocks, and acute surgical pain control.',
    shortDesc: 'Dedicated pre-operative clinic, hemodynamic depth-of-anesthesia monitoring, and acute pain rounds.',
    fullDesc: 'WeCare Anesthesiology oversees patient safety before, during, and after surgical interventions. We specialize in ultrasound-guided regional nerve blocks, target-controlled intravenous infusion anesthesia, and multi-modal opioid-sparing pain relief.',
    headOfDepartment: 'Dr. Evelyn Montgomery, MD, FASA',
    phoneExtension: 'Ext. 2150',
    floor: 'Level 2, Pre-Anesthesia & Surgical Suites',
    bedCapacity: 16,
    keyProcedures: [
      'Comprehensive Pre-Anesthetic Risk Evaluation & Optimization',
      'Ultrasound-Guided Peripheral Regional Nerve Blocks',
      'Target-Controlled Infusion (TCI) Total Intravenous Anesthesia',
      'Acute Post-Surgical Patient-Controlled Analgesia (PCA)'
    ],
    keyEquipments: [
      'Dräger Perseus A500 High-End Anesthesia Workstations',
      'Sonosite PX Ultrasound for Regional Nerve Localization',
      'Medtronic BIS Brain Function Depth of Anesthesia Monitor',
      'Alaris PCA Infusion Pumps with Dose Error Reduction'
    ],
    doctorIds: ['doc-montgomery', 'doc-peterson'],
    stats: [
      { label: 'Surgeries Safely Anesthetized', value: '9,500+' },
      { label: 'Perioperative Safety Index', value: '99.99%' },
      { label: 'Opioid-Sparing Protocols', value: '92%' }
    ]
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy & Rehabilitation',
    displayName: 'Physiotherapy & Rehabilitation',
    image: './images/dept_pediatrics_1792925480340.jpg',
    category: 'diagnostic_support',
    isBookable: true,
    tagline: 'State-of-the-art neuro-rehab, robotic gait training & athletic injury recovery',
    cardDesc: 'Physical therapy for post-surgical recovery, stroke neuro-rehabilitation, back pain, and sports fitness.',
    shortDesc: 'Robotic exoskeleton gait trainer, hydrotherapy pool, spinal decompression, and sports conditioning.',
    fullDesc: 'WeCare Physiotherapy & Physical Rehabilitation Medicine accelerates recovery from orthopedic surgeries, neurological events, and sports injuries. Our certified physical therapists utilize robotic gait exoskeletons, aquatic hydrotherapy, and targeted strength conditioning.',
    headOfDepartment: 'Dr. Simon Campbell, PT, DPT, OCS, FAAOMPT',
    phoneExtension: 'Ext. 1010',
    floor: 'Level 1, Rehabilitation & Mobility Pavilion',
    bedCapacity: 20,
    keyProcedures: [
      'Robotic Exoskeleton-Assisted Neuro-Gait Re-Education',
      'Post-Total Joint Arthroplasty Rapid Mobilization Protocol',
      'Computerized Lumbar & Cervical Decompression Traction',
      'Customized Sports Kinesiology & Biomechanical Retraining'
    ],
    keyEquipments: [
      'Hocoma Lokomat Pro Robotic Gait Orthosis',
      'AlterG Anti-Gravity Treadmill with Differential Air Pressure',
      'Chattanooga Intelect Legend XT Multi-Wave Therapy',
      'Hydroworx 300 Therapeutic Underwater Treadmill Pool'
    ],
    doctorIds: ['doc-campbell-pt', 'doc-morris-pt'],
    stats: [
      { label: 'Annual Therapy Sessions', value: '14,200+' },
      { label: 'Functional Mobility Regained', value: '96.4%' },
      { label: 'Patient Goal Achievement', value: '98.1%' }
    ]
  }
];

export const DOCTORS: Doctor[] = [
  // Pulmonology Specialists
  {
    id: 'doc-pulmo-clark',
    name: 'Dr. Gregory Clark',
    title: 'Chief of Pulmonology & Respiratory Medicine',
    departmentId: 'pulmonology',
    departmentName: 'Pulmonology',
    qualifications: 'MD, FCCP (Johns Hopkins University)',
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 290,
    consultationFee: 135,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    languages: ['English'],
    bio: 'Pioneer in interventional bronchoscopy, endobronchial ultrasound (EBUS), and personalized severe asthma and COPD therapeutics.',
    education: ['MD - Johns Hopkins School of Medicine', 'Pulmonary Critical Care - Brigham and Women’s'],
    fellowships: ['Fellow of the American College of Chest Physicians (FCCP)'],
    awards: ['Chest Physician Distinction 2024'],
    opdRoom: 'Suite 314, Respiratory Clinic',
    avatarColor: 'from-sky-600 to-indigo-900'
  },
  {
    id: 'doc-pulmo-williams',
    name: 'Dr. Rachel Williams',
    title: 'Consultant Pulmonologist & Sleep Specialist',
    departmentId: 'pulmonology',
    departmentName: 'Pulmonology',
    qualifications: 'MD, FAASM (Stanford Medicine)',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 195,
    consultationFee: 125,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:30 AM', '11:30 AM', '02:30 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Specialist in obstructive sleep apnea, pulmonary fibrosis, sarcoidosis, and non-invasive ventilation management.',
    education: ['MD - Stanford University', 'Sleep Medicine Fellowship - Stanford Sleep Center'],
    fellowships: ['American Academy of Sleep Medicine (FAASM)'],
    awards: ['Sleep Health Innovator Award 2023'],
    opdRoom: 'Suite 318, Respiratory Clinic',
    avatarColor: 'from-blue-600 to-teal-800'
  },

  // Endocrinology Specialists
  {
    id: 'doc-endo-sharma',
    name: 'Dr. Meera Sharma',
    title: 'Director of Endocrinology & Diabetes Institute',
    departmentId: 'endocrinology',
    departmentName: 'Endocrinology',
    qualifications: 'MD, DM, FACE (Columbia University & AIIMS)',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 340,
    consultationFee: 130,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    timeSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:30 PM'],
    languages: ['English', 'Hindi'],
    bio: 'Nationally recognized authority on diabetes reversal, insulin pump closed-loop systems, thyroid cancer nodules, and metabolic syndrome.',
    education: ['MD & DM Endocrinology - AIIMS New Delhi', 'Endocrine Fellowship - Columbia University'],
    fellowships: ['Fellow of the American College of Endocrinology (FACE)'],
    awards: ['Metabolic Health Pioneer Award 2024'],
    opdRoom: 'Suite 228, Endocrine Pavilion',
    avatarColor: 'from-emerald-600 to-indigo-900'
  },
  {
    id: 'doc-endo-harris',
    name: 'Dr. Julian Harris',
    title: 'Consultant Neuro-Endocrinologist & Bone Specialist',
    departmentId: 'endocrinology',
    departmentName: 'Endocrinology',
    qualifications: 'MD (University of Michigan)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 210,
    consultationFee: 125,
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM'],
    languages: ['English'],
    bio: 'Specialist in pituitary adenomas, adrenal insufficiency, severe osteoporosis, and complex hormonal feedback disorders.',
    education: ['MD - University of Michigan', 'Endocrine Fellowship - Mayo Clinic'],
    fellowships: ['The Endocrine Society Active Member'],
    awards: ['Excellence in Bone Density Management 2023'],
    opdRoom: 'Suite 230, Endocrine Pavilion',
    avatarColor: 'from-teal-600 to-slate-800'
  },

  // Dermatology Specialists
  {
    id: 'doc-derma-ross',
    name: 'Dr. Rebecca Ross',
    title: 'Chief of Clinical & Cutaneous Dermatology',
    departmentId: 'dermatology',
    departmentName: 'Dermatology',
    qualifications: 'MD, FAAD (NYU Grossman School of Medicine)',
    experienceYears: 17,
    rating: 4.9,
    reviewCount: 390,
    consultationFee: 125,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['08:30 AM', '10:00 AM', '01:00 PM', '03:00 PM'],
    languages: ['English'],
    bio: 'Specialist in digital dermatoscopy for early melanoma detection, chronic plaque psoriasis biologics, and autoimmune bullous dermatoses.',
    education: ['MD - NYU School of Medicine', 'Dermatology Residency - NYU Langone'],
    fellowships: ['Fellow of the American Academy of Dermatology (FAAD)'],
    awards: ['Top Clinical Dermatologist 2024'],
    opdRoom: 'Suite 219, Dermatology Wing',
    avatarColor: 'from-pink-600 to-rose-900'
  },
  {
    id: 'doc-derma-kim',
    name: 'Dr. Hannah Kim',
    title: 'Consultant Dermatologist & Phototherapy Lead',
    departmentId: 'dermatology',
    departmentName: 'Dermatology',
    qualifications: 'MD (Seoul National University & Harvard)',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 230,
    consultationFee: 120,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
    languages: ['English', 'Korean'],
    bio: 'Expert in pediatric eczema, atopic dermatitis biological therapies, patch allergy tests, and narrowband UVB phototherapy.',
    education: ['MD - Seoul National University', 'Fellowship - Massachusetts General Hospital'],
    fellowships: ['Society for Investigative Dermatology'],
    awards: ['Cutaneous Medicine Scholar 2023'],
    opdRoom: 'Suite 222, Dermatology Wing',
    avatarColor: 'from-fuchsia-600 to-indigo-800'
  },

  // Plastic & Reconstructive Surgery Specialists
  {
    id: 'doc-plastic-valdez',
    name: 'Dr. Elena Valdez',
    title: 'Chief of Plastic & Microvascular Reconstructive Surgery',
    departmentId: 'plastic_surgery',
    departmentName: 'Plastic & Reconstructive Surgery',
    qualifications: 'MD, FACS (Baylor College of Medicine)',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 275,
    consultationFee: 150,
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Master reconstructive micro-surgeon specializing in post-mastectomy breast reconstruction (DIEP flaps), maxillofacial trauma repair, and burn scar revision.',
    education: ['MD - Baylor College of Medicine', 'Plastic Surgery Residency - UT Southwestern'],
    fellowships: ['Fellow of the American College of Surgeons (FACS)', 'American Society of Plastic Surgeons'],
    awards: ['Pioneer in Microvascular Flap Survival 2024'],
    opdRoom: 'Suite 214, Plastic Surgery Center',
    avatarColor: 'from-purple-600 to-indigo-900'
  },
  {
    id: 'doc-plastic-morgan',
    name: 'Dr. Marcus Morgan',
    title: 'Consultant Craniofacial & Aesthetic Surgeon',
    departmentId: 'plastic_surgery',
    departmentName: 'Plastic & Reconstructive Surgery',
    qualifications: 'MD, FRCS (Plast) (Oxford University)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 190,
    consultationFee: 145,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:30 PM'],
    languages: ['English'],
    bio: 'Specialist in cleft palate repair, post-trauma contour reconstruction, delicate skin grafting, and aesthetic rejuvenation.',
    education: ['MBBS & MD - Oxford University', 'Craniofacial Fellowship - Great Ormond Street Hospital'],
    fellowships: ['Royal College of Surgeons (Plast)'],
    awards: ['Surgical Precision Honor 2023'],
    opdRoom: 'Suite 216, Plastic Surgery Center',
    avatarColor: 'from-violet-600 to-slate-900'
  },
  // Cardiology
  {
    id: 'doc-vance',
    name: 'Dr. Marcus Vance',
    title: 'Chief of Cardiology & Interventional Lead',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Care',
    qualifications: 'MD, FACC, FSCAI (Harvard Medical School)',
    experienceYears: 22,
    rating: 4.9,
    reviewCount: 312,
    consultationFee: 140,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    languages: ['English', 'German'],
    bio: 'Dr. Marcus Vance is an internationally recognized interventional cardiologist with over two decades of experience in complex coronary stent placement, structural heart repair, and catheter-based therapies.',
    education: [
      'MD - Harvard Medical School, Magna Cum Laude',
      'Internal Medicine Residency - Massachusetts General Hospital',
      'Cardiology Fellowship - Brigham and Women’s Hospital'
    ],
    fellowships: [
      'Fellow of the American College of Cardiology (FACC)',
      'Fellow of the Society for Cardiovascular Angiography and Interventions'
    ],
    awards: [
      'Distinguished Clinician in Cardiovascular Medicine 2024',
      'Top Interventional Cardiologist - Regional Health Honors 2022'
    ],
    opdRoom: 'Suite 302, Heart Wing',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'doc-rostova',
    name: 'Dr. Elena Rostova',
    title: 'Director of Cardiac Electrophysiology',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Care',
    qualifications: 'MD, PhD, FHRS (Johns Hopkins University)',
    experienceYears: 16,
    rating: 4.8,
    reviewCount: 248,
    consultationFee: 130,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:30 AM', '11:00 AM', '01:30 PM', '04:00 PM'],
    languages: ['English', 'Russian', 'French'],
    bio: 'Dr. Rostova specializes in cardiac rhythm disorders, radiofrequency ablation of atrial fibrillation, and physiological conduction system pacing for heart failure patients.',
    education: [
      'MD & PhD in Biophysics - Johns Hopkins University School of Medicine',
      'Cardiology Fellowship - Cleveland Clinic Foundation'
    ],
    fellowships: [
      'Heart Rhythm Society Fellow (FHRS)',
      'European Society of Cardiology Research Fellow'
    ],
    awards: [
      'Innovator Award for Atrial Fibrillation Mapping 2023',
      'Excellence in Patient Safety Citation 2025'
    ],
    opdRoom: 'Suite 305, Heart Wing',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'doc-almansoor',
    name: 'Dr. Tariq Al-Mansoor',
    title: 'Senior Cardiothoracic & Aortic Surgeon',
    departmentId: 'cardiothoracic_surgery',
    departmentName: 'Cardiothoracic Surgery',
    qualifications: 'MS, MCh, FRCS (CTh) (Oxford & Royal Brompton)',
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 195,
    consultationFee: 160,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    timeSlots: ['10:00 AM', '11:30 AM', '03:00 PM'],
    languages: ['English', 'Arabic'],
    bio: 'Renowned for arterial revascularization and aortic aneurysm repair, Dr. Al-Mansoor has led over 3,000 successful open-heart and minimally invasive valve procedures.',
    education: [
      'MBBS & MS - Oxford University Medical Sciences',
      'Cardiothoracic Surgery Residency - Royal Brompton & Harefield NHS'
    ],
    fellowships: [
      'Fellow of Royal College of Surgeons (Cardiothoracic)',
      'American Association for Thoracic Surgery Member'
    ],
    awards: [
      'Pioneer in Beating-Heart Bypass Surgery Award',
      'Clinical Leadership Merit 2024'
    ],
    opdRoom: 'Suite 308, Heart Wing',
    avatarColor: 'from-sky-700 to-slate-800'
  },

  // Neurology
  {
    id: 'doc-jenkins',
    name: 'Dr. Sarah Jenkins',
    title: 'Chief Neurologist & Stroke Director',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MD, FAAN (Columbia University College of Physicians)',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 380,
    consultationFee: 135,
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    timeSlots: ['09:00 AM', '10:00 AM', '01:30 PM', '03:00 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Dr. Sarah Jenkins leads the Comprehensive Stroke Center, focusing on acute ischemic stroke intervention, migraine prophylaxis, and neuroimmunology.',
    education: [
      'MD - Columbia University College of Physicians and Surgeons',
      'Neurology Residency - NewYork-Presbyterian Hospital'
    ],
    fellowships: [
      'Vascular Neurology & Stroke Fellowship - Columbia Neurological Institute',
      'Fellow of the American Academy of Neurology (FAAN)'
    ],
    awards: [
      'National Stroke Care Champion 2024',
      'Distinguished Medical Educator 2023'
    ],
    opdRoom: 'Suite 401, Neuro Wing',
    avatarColor: 'from-purple-600 to-indigo-800'
  },
  {
    id: 'doc-chen',
    name: 'Dr. David Chen',
    title: 'Senior Neurosurgeon & Spine Specialist',
    departmentId: 'neurosurgery',
    departmentName: 'Neurosurgery',
    qualifications: 'MD, PhD, FAANS (Stanford University)',
    experienceYears: 17,
    rating: 4.9,
    reviewCount: 284,
    consultationFee: 155,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['09:30 AM', '11:00 AM', '02:30 PM'],
    languages: ['English', 'Mandarin'],
    bio: 'Dr. David Chen specializes in complex cranial microsurgery, skull-base tumors, and robotic spinal decompression and stabilizing instrumentation.',
    education: [
      'MD & PhD in Neural Bioengineering - Stanford University',
      'Neurosurgery Residency - Stanford Health Care'
    ],
    fellowships: [
      'Fellow of the American Association of Neurological Surgeons (FAANS)',
      'Complex Spine Fellowship - UCSF Medical Center'
    ],
    awards: [
      'Surgical Technology Innovator 2023',
      'Best Neurosurgeon - Metropolitan Medical Review'
    ],
    opdRoom: 'Suite 404, Neuro Wing',
    avatarColor: 'from-violet-700 to-slate-900'
  },
  {
    id: 'doc-patel',
    name: 'Dr. Maya Patel',
    title: 'Consultant Pediatric Neurologist',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MD, DM Neurology (Yale School of Medicine)',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 210,
    consultationFee: 125,
    availableDays: ['Monday', 'Tuesday', 'Friday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'],
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Dr. Maya Patel provides compassionate evaluation and management for pediatric seizures, neuromuscular developmental delay, and pediatric migraine conditions.',
    education: [
      'MD - Yale School of Medicine',
      'Pediatric Neurology Fellowship - Boston Children’s Hospital'
    ],
    fellowships: [
      'Child Neurology Society Active Fellow',
      'American Epilepsy Society'
    ],
    awards: [
      'Excellence in Pediatric Patient Care 2024',
      'Young Investigator Research Grant'
    ],
    opdRoom: 'Suite 407, Neuro Wing',
    avatarColor: 'from-fuchsia-600 to-purple-800'
  },

  // Orthopaedics
  {
    id: 'doc-sterling',
    name: 'Dr. Robert Sterling',
    title: 'Director of Robotic Joint Replacement',
    departmentId: 'orthopedics',
    departmentName: 'Orthopaedics & Joint Replacement',
    qualifications: 'MD, FAAOS (University of Pennsylvania)',
    experienceYears: 24,
    rating: 4.9,
    reviewCount: 420,
    consultationFee: 140,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['08:30 AM', '10:00 AM', '01:00 PM', '02:30 PM'],
    languages: ['English'],
    bio: 'Dr. Robert Sterling has performed more than 6,000 joint reconstructions. He is a pioneer in computer-assisted kinematic alignment for total knee replacement.',
    education: [
      'MD - Perelman School of Medicine at University of Pennsylvania',
      'Orthopedic Surgery Residency - Hospital of the University of Pennsylvania'
    ],
    fellowships: [
      'Adult Reconstruction Fellowship - Hospital for Special Surgery (HSS), NYC',
      'Fellow of the American Academy of Orthopaedic Surgeons (FAAOS)'
    ],
    awards: [
      'Lifetime Achievement in Arthroplasty 2025',
      'Top Orthopedic Surgeon Award 5 Consecutive Years'
    ],
    opdRoom: 'Suite 201, Ortho Wing',
    avatarColor: 'from-amber-600 to-stone-800'
  },
  {
    id: 'doc-mercier',
    name: 'Dr. Chloe Mercier',
    title: 'Consultant Orthopedic Trauma & Sports Surgeon',
    departmentId: 'orthopedics',
    departmentName: 'Orthopaedics & Joint Replacement',
    qualifications: 'MD, FRCSC (McGill University)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 198,
    consultationFee: 125,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '03:30 PM'],
    languages: ['English', 'French'],
    bio: 'Specializing in arthroscopic rotator cuff and cruciate ligament reconstruction, Dr. Mercier also oversees the hospital’s high-energy orthopedic trauma triage.',
    education: [
      'MD - McGill University Faculty of Medicine',
      'Orthopedic Surgery - Montreal General Hospital'
    ],
    fellowships: [
      'Sports Medicine & Arthroscopy - Steadman Philippon Clinic',
      'Royal College of Physicians and Surgeons of Canada'
    ],
    awards: [
      'Sports Medicine Practitioner Award 2023',
      'Excellence in Surgical Resident Mentorship'
    ],
    opdRoom: 'Suite 204, Ortho Wing',
    avatarColor: 'from-orange-600 to-amber-800'
  },
  {
    id: 'doc-nair',
    name: 'Dr. Arjun Nair',
    title: 'Consultant Spine & Arthroscopic Surgeon',
    departmentId: 'orthopedics',
    departmentName: 'Orthopaedics & Joint Replacement',
    qualifications: 'MS Ortho, DNB, AO Spine Fellow (AIIMS & Charité)',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 230,
    consultationFee: 130,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    timeSlots: ['09:30 AM', '11:30 AM', '03:00 PM', '04:30 PM'],
    languages: ['English', 'Hindi', 'Malayalam'],
    bio: 'Dr. Arjun Nair has extensive experience in endoscopic micro-lumbar discectomy, scoliosis correction, and complex pelvic reconstructive surgery.',
    education: [
      'MBBS & MS Orthopedics - AIIMS New Delhi',
      'Spine Fellowship - Charité Universitätsmedizin Berlin'
    ],
    fellowships: [
      'AO Spine International Fellow',
      'International Society of Orthopaedic Surgery and Traumatology'
    ],
    awards: [
      'AO Spine Young Investigator Distinction 2022',
      'Patient Choice Award 2024'
    ],
    opdRoom: 'Suite 207, Ortho Wing',
    avatarColor: 'from-amber-700 to-emerald-900'
  },

  // Emergency & Trauma Care
  {
    id: 'doc-taylor',
    name: 'Dr. Zachary Taylor',
    title: 'Director of Emergency & Trauma Medicine',
    departmentId: 'emergency',
    departmentName: 'Accident & Emergency (A&E / ER)',
    qualifications: 'MD, FACEP (UCLA David Geffen School of Medicine)',
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 510,
    consultationFee: 120,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['08:00 AM', '12:00 PM', '04:00 PM', '08:00 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Dr. Zachary Taylor coordinates WeCare’s Level-1 trauma readiness, disaster response protocols, and hyper-acute resuscitation units with rigorous triage standards.',
    education: [
      'MD - David Geffen School of Medicine at UCLA',
      'Emergency Medicine Residency - LAC+USC Medical Center'
    ],
    fellowships: [
      'Fellow of the American College of Emergency Physicians (FACEP)',
      'Disaster Medicine & Tactical EMS Certification'
    ],
    awards: [
      'Emergency Physician of Excellence 2024',
      'Hero in Emergency Medicine Medal'
    ],
    opdRoom: 'Emergency Care Unit, Bay 1',
    avatarColor: 'from-red-600 to-rose-800'
  },
  {
    id: 'doc-gallagher',
    name: 'Dr. Liam Gallagher',
    title: 'Lead Critical Care & Resuscitation Specialist',
    departmentId: 'emergency',
    departmentName: 'Accident & Emergency (A&E / ER)',
    qualifications: 'MD, FCCP (University of Washington & Harborview)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 230,
    consultationFee: 125,
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    timeSlots: ['09:00 AM', '01:00 PM', '05:00 PM'],
    languages: ['English'],
    bio: 'Focuses on critical care ultrasound, severe sepsis management, acute respiratory distress syndrome (ARDS), and hemodynamic resuscitation in the intensive care unit.',
    education: [
      'MD - University of Washington School of Medicine',
      'Critical Care Fellowship - Harborview Medical Center'
    ],
    fellowships: [
      'Fellow of the American College of Chest Physicians (FCCP)',
      'Society of Critical Care Medicine (SCCM)'
    ],
    awards: [
      'Resuscitation Leadership Award 2023',
      'ICU Quality Champion 2025'
    ],
    opdRoom: 'Critical Care Triage, Bay 4',
    avatarColor: 'from-slate-700 to-red-950'
  },

  // Anesthesiology Doctors
  {
    id: 'doc-montgomery',
    name: 'Dr. Evelyn Montgomery',
    title: 'Director of Anesthesiology & Perioperative Care',
    departmentId: 'anesthesiology',
    departmentName: 'Anesthesiology & Perioperative Medicine',
    qualifications: 'MD, FASA (Johns Hopkins School of Medicine)',
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 215,
    consultationFee: 130,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['08:00 AM', '10:00 AM', '01:30 PM'],
    languages: ['English', 'German'],
    bio: 'Directs complex neurosurgical and cardiac anesthesia protocols, ultrasound-guided regional nerve blocks, and perioperative safety standardization.',
    education: ['MD - Johns Hopkins', 'Anesthesiology Residency - Mass General'],
    fellowships: ['Fellow of the American Society of Anesthesiologists (FASA)'],
    awards: ['Patient Safety Champion in Anesthesia 2024'],
    opdRoom: 'Suite 215, Pre-Anesthesia Clinic',
    avatarColor: 'from-teal-600 to-slate-800'
  },
  {
    id: 'doc-peterson',
    name: 'Dr. Carl Peterson',
    title: 'Senior Obstetric & Pediatric Anesthesiologist',
    departmentId: 'anesthesiology',
    departmentName: 'Anesthesiology & Perioperative Medicine',
    qualifications: 'MD (Cornell University Weill Cornell Medicine)',
    experienceYears: 15,
    rating: 4.8,
    reviewCount: 180,
    consultationFee: 125,
    availableDays: ['Tuesday', 'Wednesday', 'Saturday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
    languages: ['English'],
    bio: 'Expert in 24/7 painless labor epidural analgesia, neonatal anesthesia, and multimodal non-opioid post-surgical recovery.',
    education: ['MD - Weill Cornell', 'Pediatric Anesthesia Fellowship - Boston Children’s'],
    fellowships: ['Society for Obstetric Anesthesia and Perinatology'],
    awards: ['Excellence in Labor Analgesia Care 2023'],
    opdRoom: 'Suite 218, Pre-Anesthesia Clinic',
    avatarColor: 'from-cyan-700 to-indigo-900'
  },

  // ENT Doctors
  {
    id: 'doc-blake-ent',
    name: 'Dr. Christopher Blake',
    title: 'Director of Otorhinolaryngology & Head-Neck Surgery',
    departmentId: 'ent',
    departmentName: 'Ear, Nose, and Throat (ENT)',
    qualifications: 'MD, FACS (Harvard Medical School & Mass Eye and Ear)',
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 320,
    consultationFee: 135,
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    languages: ['English'],
    bio: 'Specialist in minimally invasive endoscopic sinus surgery (FESS), cochlear implants for profound hearing loss, and micro-laryngeal voice restoration.',
    education: ['MD - Harvard Medical School', 'ENT Residency - Massachusetts Eye and Ear'],
    fellowships: ['Fellow of the American College of Surgeons (FACS)'],
    awards: ['Pioneer in Endoscopic Sinus Micro-Debrider Surgery'],
    opdRoom: 'Suite 415, ENT Clinic',
    avatarColor: 'from-sky-600 to-indigo-800'
  },
  {
    id: 'doc-nathan-ent',
    name: 'Dr. Alisha Nathan',
    title: 'Consultant Pediatric & Adult Otolaryngologist',
    departmentId: 'ent',
    departmentName: 'Ear, Nose, and Throat (ENT)',
    qualifications: 'MS, DNB, FICS (Christian Medical College)',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 210,
    consultationFee: 120,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:30 AM', '11:30 AM', '02:30 PM'],
    languages: ['English', 'Hindi'],
    bio: 'Provides specialized pediatric airway management, microscopic tympanoplasty, allergy rhinitis therapies, and tonsil/adenoid coblation.',
    education: ['MBBS & MS ENT - CMC Vellore', 'Pediatric Otolaryngology Training - Great Ormond Street'],
    fellowships: ['International College of Surgeons Fellow'],
    awards: ['Excellence in Pediatric ENT Care 2024'],
    opdRoom: 'Suite 418, ENT Clinic',
    avatarColor: 'from-blue-600 to-teal-800'
  },

  // General Surgery Doctors
  {
    id: 'doc-reynolds-gen',
    name: 'Dr. Jonathan Reynolds',
    title: 'Chief of General & Minimal Access Surgery',
    departmentId: 'general_surgery',
    departmentName: 'General & Minimal Access Laparoscopic Surgery',
    qualifications: 'MD, FACS, FASMBS (Duke University School of Medicine)',
    experienceYears: 21,
    rating: 4.9,
    reviewCount: 410,
    consultationFee: 135,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    timeSlots: ['08:30 AM', '10:30 AM', '01:30 PM', '03:30 PM'],
    languages: ['English'],
    bio: 'Pioneered 3D laparoscopic cholecystectomy, complex ventral hernia abdominal wall reconstruction, and minimally invasive gastrointestinal surgery.',
    education: ['MD - Duke University', 'General Surgery Residency - Johns Hopkins Hospital'],
    fellowships: ['FACS', 'Society of American Gastrointestinal and Endoscopic Surgeons'],
    awards: ['Master Laparoscopic Surgeon Award 2024'],
    opdRoom: 'Suite 205, Surgery Clinic',
    avatarColor: 'from-emerald-700 to-slate-900'
  },
  {
    id: 'doc-kaufman-gen',
    name: 'Dr. Valerie Kaufman',
    title: 'Consultant Endocrine & Laparoscopic Surgeon',
    departmentId: 'general_surgery',
    departmentName: 'General & Minimal Access Laparoscopic Surgery',
    qualifications: 'MD, FACS (University of Michigan Medical School)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 220,
    consultationFee: 125,
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
    languages: ['English', 'German'],
    bio: 'Expert in scarless keyhole thyroidectomy, parathyroid adenoma excision, and acute laparoscopic appendectomy.',
    education: ['MD - University of Michigan', 'Endocrine Surgery Fellowship - Mayo Clinic'],
    fellowships: ['American Association of Endocrine Surgeons'],
    awards: ['Top Clinical Outcomes in Endocrine Surgery 2023'],
    opdRoom: 'Suite 208, Surgery Clinic',
    avatarColor: 'from-teal-700 to-indigo-900'
  },

  // Nephrology & Urology Doctors
  {
    id: 'doc-hasan-nephro',
    name: 'Dr. Tariq Hasan',
    title: 'Director of Nephrology & Renal Transplantation',
    departmentId: 'nephrology',
    departmentName: 'Nephrology',
    qualifications: 'MD, DM, FASN (Emory University & Oxford)',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 290,
    consultationFee: 140,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    languages: ['English', 'Arabic'],
    bio: 'Directs the 30-station dialysis center, living donor kidney transplants, glomerulonephritis therapies, and cardiorenal syndrome.',
    education: ['MD - Emory University School of Medicine', 'Nephrology - Oxford University'],
    fellowships: ['Fellow of the American Society of Nephrology (FASN)'],
    awards: ['National Kidney Foundation Excellence Citation 2024'],
    opdRoom: 'Suite 315, Renal Center',
    avatarColor: 'from-blue-700 to-sky-900'
  },
  {
    id: 'doc-keller-uro',
    name: 'Dr. Martin Keller',
    title: 'Senior Urological Surgeon & Endourologist',
    departmentId: 'urology',
    departmentName: 'Urology',
    qualifications: 'MD, FACS (Vanderbilt University)',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 310,
    consultationFee: 145,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:30 AM', '11:30 AM', '02:30 PM'],
    languages: ['English', 'German'],
    bio: 'Specialist in Holmium laser enucleation of the prostate (HoLEP), flexible ureteroscopic laser lithotripsy (RIRS), and robotic prostatectomy.',
    education: ['MD - Vanderbilt', 'Urologic Oncology Fellowship - Memorial Sloan Kettering'],
    fellowships: ['American Urological Association Active Member', 'FACS'],
    awards: ['Excellence in Minimally Invasive Urologic Surgery 2023'],
    opdRoom: 'Suite 319, Renal Center',
    avatarColor: 'from-indigo-700 to-slate-900'
  },

  // Ophthalmology Doctors
  {
    id: 'doc-finch-eye',
    name: 'Dr. Alistair Finch',
    title: 'Director of Ophthalmology & Cataract Microsurgery',
    departmentId: 'ophthalmology',
    departmentName: 'Ophthalmology & Eye Care Institute',
    qualifications: 'MD, FRCS (Ophth) (Moorfields Eye Hospital London)',
    experienceYears: 22,
    rating: 4.9,
    reviewCount: 460,
    consultationFee: 130,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:30 PM'],
    languages: ['English'],
    bio: 'Over 10,000 successful femtosecond laser cataract surgeries, multifocal premium intraocular lens implants, and corneal cross-linking.',
    education: ['MBBS & MD - Moorfields Eye Hospital London', 'Cornea Fellowship - Johns Hopkins Wilmer Eye'],
    fellowships: ['Royal College of Ophthalmologists (FRCOphth UK)'],
    awards: ['Global Innovator in Micro-Incision Phacoemulsification'],
    opdRoom: 'Suite 120, Eye Pavilion',
    avatarColor: 'from-sky-600 to-blue-900'
  },
  {
    id: 'doc-lin-eye',
    name: 'Dr. Sharon Lin',
    title: 'Consultant Vitreo-Retinal Surgeon',
    departmentId: 'ophthalmology',
    departmentName: 'Ophthalmology & Eye Care Institute',
    qualifications: 'MD (University of California San Francisco)',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 215,
    consultationFee: 135,
    availableDays: ['Wednesday', 'Thursday', 'Saturday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM'],
    languages: ['English', 'Mandarin'],
    bio: 'Specialist in diabetic macular edema, micro-incision vitrectomy for retinal detachment, and macular hole closures.',
    education: ['MD - UCSF School of Medicine', 'Retina Fellowship - Duke Eye Center'],
    fellowships: ['American Society of Retina Specialists (ASRS)'],
    awards: ['Excellence in Retinal Preservation 2024'],
    opdRoom: 'Suite 124, Eye Pavilion',
    avatarColor: 'from-teal-600 to-indigo-800'
  },

  // Psychiatry Doctors
  {
    id: 'doc-aris-psych',
    name: 'Dr. Hannah Aris',
    title: 'Director of Behavioral Health & Neuro-Psychiatry',
    departmentId: 'psychiatry',
    departmentName: 'Psychiatry & Behavioral Health',
    qualifications: 'MD, DFAPA (Yale School of Medicine)',
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 340,
    consultationFee: 140,
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    timeSlots: ['09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM'],
    languages: ['English', 'French'],
    bio: 'Specialist in mood disorders, treatment-resistant depression using rTMS neuromodulation, trauma therapies, and psycho-pharmacology.',
    education: ['MD - Yale School of Medicine', 'Psychiatry Residency - Payne Whitney Psychiatric Clinic'],
    fellowships: ['Distinguished Fellow of the American Psychiatric Association (DFAPA)'],
    awards: ['Mental Health Advocate of the Year 2024'],
    opdRoom: 'Suite 310, Wellness Wing',
    avatarColor: 'from-indigo-600 to-purple-900'
  },
  {
    id: 'doc-ross-psych',
    name: 'Dr. Douglas Ross',
    title: 'Consultant Child, Adolescent & Adult Psychiatrist',
    departmentId: 'psychiatry',
    departmentName: 'Psychiatry & Behavioral Health',
    qualifications: 'MD, FAACAP (Northwestern University Feinberg)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 220,
    consultationFee: 130,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
    languages: ['English'],
    bio: 'Dedicated to adolescent anxiety, ADHD neuro-developmental assessments, family therapy, and stress resiliency coaching.',
    education: ['MD - Northwestern Feinberg', 'Child Psychiatry - Ann & Robert H. Lurie Children’s'],
    fellowships: ['American Academy of Child and Adolescent Psychiatry (FAACAP)'],
    awards: ['Excellence in Adolescent Compassion 2023'],
    opdRoom: 'Suite 314, Wellness Wing',
    avatarColor: 'from-violet-600 to-slate-800'
  },

  // Radiology Doctors
  {
    id: 'doc-bernstein-rad',
    name: 'Dr. Leonard Bernstein',
    title: 'Director of Diagnostic & Interventional Radiology',
    departmentId: 'radiology',
    departmentName: 'Radiology & Diagnostic Imaging',
    qualifications: 'MD, FACR (University of California Los Angeles)',
    experienceYears: 23,
    rating: 4.9,
    reviewCount: 390,
    consultationFee: 130,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['08:30 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    languages: ['English'],
    bio: 'Leads 3.0T MRI neuro-imaging, cardiac CT angiography reading, and image-guided diagnostic biopsies with rapid same-day verified reporting.',
    education: ['MD - UCLA David Geffen', 'Diagnostic Radiology - UCSF Health'],
    fellowships: ['Fellow of the American College of Radiology (FACR)'],
    awards: ['Distinguished Diagnostic Radiologist 2024'],
    opdRoom: 'Suite 105, Imaging Complex',
    avatarColor: 'from-blue-600 to-slate-900'
  },
  {
    id: 'doc-dubois-rad',
    name: 'Dr. Amelie Dubois',
    title: 'Senior Breast & Body Imaging Radiologist',
    departmentId: 'radiology',
    departmentName: 'Radiology & Diagnostic Imaging',
    qualifications: 'MD (McGill University & Harvard BWH)',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 270,
    consultationFee: 125,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:00 AM', '11:30 AM', '02:30 PM'],
    languages: ['English', 'French'],
    bio: 'Specialist in 3D digital breast tomosynthesis, breast MRI evaluations, and ultrasound-guided vacuum-assisted core biopsies.',
    education: ['MD - McGill University', 'Women’s Imaging Fellowship - Brigham and Women’s Hospital'],
    fellowships: ['Society of Breast Imaging (SBI)'],
    awards: ['Early Cancer Detection Leadership Award 2023'],
    opdRoom: 'Suite 108, Imaging Complex',
    avatarColor: 'from-teal-600 to-slate-800'
  },

  // Pathology Doctors
  {
    id: 'doc-thorne-path',
    name: 'Dr. Melissa Thorne',
    title: 'Chief Pathologist & Director of Laboratory Medicine',
    departmentId: 'pathology',
    departmentName: 'Pathology & Clinical Laboratory Medicine',
    qualifications: 'MD, FCAP (Mayo Clinic School of Medicine)',
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 280,
    consultationFee: 110,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
    languages: ['English'],
    bio: 'Directs CAP-accredited clinical biochemistry, frozen section oncologic biopsy reviews, and molecular genetic sequencing.',
    education: ['MD - Mayo Clinic', 'Anatomic & Clinical Pathology - Cleveland Clinic'],
    fellowships: ['College of American Pathologists (FCAP)'],
    awards: ['Pathology Laboratory Quality Trophy 2024'],
    opdRoom: 'Suite 150, Central Lab',
    avatarColor: 'from-emerald-600 to-slate-900'
  },
  {
    id: 'doc-singh-path',
    name: 'Dr. Gurpreet Singh',
    title: 'Consultant Hematopathologist & Molecular Geneticist',
    departmentId: 'pathology',
    departmentName: 'Pathology & Clinical Laboratory Medicine',
    qualifications: 'MD, FRCPath (King’s College Hospital London)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 195,
    consultationFee: 115,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['10:00 AM', '12:00 PM', '03:00 PM'],
    languages: ['English', 'Punjabi'],
    bio: 'Expert in bone marrow biopsy interpretation, flow cytometry leukemia phenotyping, and companion diagnostic biomarker testing.',
    education: ['MD - AIIMS', 'Hematopathology Fellowship - King’s College London'],
    fellowships: ['Fellow of the Royal College of Pathologists (FRCPath UK)'],
    awards: ['Excellence in Molecular Diagnostics 2023'],
    opdRoom: 'Suite 154, Central Lab',
    avatarColor: 'from-teal-700 to-blue-900'
  },

  // Physiotherapy Doctors
  {
    id: 'doc-campbell-pt',
    name: 'Dr. Simon Campbell',
    title: 'Director of Physical Rehabilitation & Sports Recovery',
    departmentId: 'physiotherapy',
    departmentName: 'Physiotherapy & Physical Rehabilitation Medicine',
    qualifications: 'PT, DPT, OCS, FAAOMPT (Boston University)',
    experienceYears: 17,
    rating: 4.9,
    reviewCount: 380,
    consultationFee: 95,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'],
    languages: ['English'],
    bio: 'Specialist in post-operative knee/hip replacement rapid gait restoration, robotic exoskeleton rehabilitation, and spinal mobilization.',
    education: ['Doctor of Physical Therapy (DPT) - Boston University', 'Orthopedic Residency - MGH Institute'],
    fellowships: ['Board Certified Orthopaedic Clinical Specialist (OCS)'],
    awards: ['Clinician of the Year in Physical Rehabilitation 2024'],
    opdRoom: 'Suite 101, Rehab Center',
    avatarColor: 'from-amber-600 to-teal-800'
  },
  {
    id: 'doc-morris-pt',
    name: 'Dr. Sandra Morris',
    title: 'Consultant Neuro-Physiotherapist & Stroke Specialist',
    departmentId: 'physiotherapy',
    departmentName: 'Physiotherapy & Physical Rehabilitation Medicine',
    qualifications: 'PT, DPT, NCS (Columbia University)',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 240,
    consultationFee: 90,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Dedicated to neurological rehabilitation following stroke, spinal cord injury, Parkinson’s gait retraining, and aquatic treadmill therapy.',
    education: ['DPT - Columbia University', 'Neurologic Physical Therapy Residency - NYU Langone'],
    fellowships: ['Board Certified Neurologic Clinical Specialist (NCS)'],
    awards: ['Excellence in Neuro-Rehabilitation Therapy 2023'],
    opdRoom: 'Suite 104, Rehab Center',
    avatarColor: 'from-orange-600 to-indigo-900'
  },

  // Oncology Doctors
  {
    id: 'doc-voss',
    name: 'Dr. Julian Voss',
    title: 'Director of Medical Oncology & Immunotherapy',
    departmentId: 'oncology',
    departmentName: 'Oncology & Cancer Center',
    qualifications: 'MD, PhD, FACP (Heidelberg & Memorial Sloan Kettering)',
    experienceYears: 21,
    rating: 4.9,
    reviewCount: 265,
    consultationFee: 150,
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
    languages: ['English', 'German'],
    bio: 'Dr. Julian Voss directs personalized systemic therapy, precision genomic profiling, and modern immunotherapy protocols for solid tumors and lymphomas.',
    education: [
      'MD & PhD in Molecular Oncology - Heidelberg University',
      'Medical Oncology Fellowship - Memorial Sloan Kettering Cancer Center'
    ],
    fellowships: [
      'Fellow of the American College of Physicians (FACP)',
      'American Society of Clinical Oncology (ASCO) Senior Member'
    ],
    awards: [
      'Global Cancer Research Distinction 2023',
      'Humanitarian in Oncology Award 2024'
    ],
    opdRoom: 'Suite 112, Cancer Center',
    avatarColor: 'from-rose-600 to-indigo-900'
  },
  {
    id: 'doc-raman',
    name: 'Dr. Priya Raman',
    title: 'Chief Surgical Oncologist',
    departmentId: 'oncology',
    departmentName: 'Oncology & Cancer Center',
    qualifications: 'MD, FACS, DNB Surg Onco (Tata Memorial & MD Anderson)',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 310,
    consultationFee: 145,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '10:30 AM', '01:30 PM'],
    languages: ['English', 'Tamil', 'Hindi'],
    bio: 'Dr. Priya Raman specializes in oncoplastic breast conservation surgery, sentinel lymph node mapping, and minimally invasive gastrointestinal tumor resection.',
    education: [
      'MBBS & MS General Surgery - Madras Medical College',
      'Surgical Oncology Fellowship - Tata Memorial Hospital & MD Anderson Cancer Center'
    ],
    fellowships: [
      'Fellow of the American College of Surgeons (FACS)',
      'Society of Surgical Oncology (SSO)'
    ],
    awards: [
      'Women in Surgery Leadership Trophy 2024',
      'Outstanding Surgical Precision Medal'
    ],
    opdRoom: 'Suite 115, Cancer Center',
    avatarColor: 'from-pink-600 to-rose-900'
  },
  {
    id: 'doc-adebayo',
    name: 'Dr. Samuel Adebayo',
    title: 'Consultant Radiation Oncologist',
    departmentId: 'oncology',
    departmentName: 'Oncology & Cancer Center',
    qualifications: 'MD, FRCR (London & Royal Marsden)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 178,
    consultationFee: 135,
    availableDays: ['Monday', 'Tuesday', 'Friday'],
    timeSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    languages: ['English', 'Yoruba'],
    bio: 'Expert in image-guided stereotactic radiotherapy (SBRT/SRS) and volumetric modulated arc therapy (VMAT), minimizing healthy tissue exposure.',
    education: [
      'MD - University of Ibadan College of Medicine',
      'Clinical Oncology Specialist Training - The Royal Marsden Hospital, London'
    ],
    fellowships: [
      'Fellow of Royal College of Radiologists (FRCR UK)',
      'European Society for Radiotherapy and Oncology (ESTRO)'
    ],
    awards: [
      'Excellence in Radiotherapy Delivery 2023',
      'Clinical Compassion Award 2025'
    ],
    opdRoom: 'Suite 118, Cancer Center',
    avatarColor: 'from-red-600 to-slate-900'
  },

  // Pediatrics Doctors
  {
    id: 'doc-zhao',
    name: 'Dr. Emily Zhao',
    title: 'Head of Pediatrics & NICU Director',
    departmentId: 'pediatrics',
    departmentName: 'Paediatrics & Neonatology (NICU)',
    qualifications: 'MD, FAAP (University of Chicago Pritzker)',
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 450,
    consultationFee: 110,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:30 PM'],
    languages: ['English', 'Mandarin'],
    bio: 'Dr. Emily Zhao has managed thousands of high-risk neonatal transitions. Her clinic focuses on newborn critical care, congenital anomalies, and pediatric wellness.',
    education: [
      'MD - University of Chicago Pritzker School of Medicine',
      'Pediatrics & Neonatal-Perinatal Fellowship - Ann & Robert H. Lurie Children’s Hospital'
    ],
    fellowships: [
      'Fellow of the American Academy of Pediatrics (FAAP)',
      'Perinatal Quality Collaborative Lead'
    ],
    awards: [
      'Pediatrician of the Year 2024',
      'Compassion in Healing Award'
    ],
    opdRoom: 'Suite 210, Children’s Wing',
    avatarColor: 'from-teal-600 to-emerald-800'
  },
  {
    id: 'doc-santos',
    name: 'Dr. Gabriel Santos',
    title: 'Consultant Pediatric Pulmonologist',
    departmentId: 'pediatrics',
    departmentName: 'Paediatrics & Neonatology (NICU)',
    qualifications: 'MD (Stanford University School of Medicine)',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 220,
    consultationFee: 115,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM'],
    languages: ['English', 'Spanish', 'Portuguese'],
    bio: 'Specialist in pediatric asthma, recurring childhood bronchitis, cystic fibrosis care, and pediatric sleep-disordered breathing with gentle bedside rapport.',
    education: [
      'MD - Stanford University School of Medicine',
      'Pediatric Pulmonology Fellowship - Texas Children’s Hospital'
    ],
    fellowships: [
      'American Thoracic Society Pediatric Assembly',
      'American Academy of Pediatrics'
    ],
    awards: [
      'Young Clinician Award for Childhood Asthma Advocacy',
      'Excellence in Patient Education 2024'
    ],
    opdRoom: 'Suite 214, Children’s Wing',
    avatarColor: 'from-emerald-600 to-cyan-800'
  },
  {
    id: 'doc-nour',
    name: 'Dr. Fatima Nour',
    title: 'Specialist Developmental & General Pediatrician',
    departmentId: 'pediatrics',
    departmentName: 'Paediatrics & Neonatology (NICU)',
    qualifications: 'MD, MRCPCH (University of Toronto & Great Ormond Street)',
    experienceYears: 11,
    rating: 4.9,
    reviewCount: 275,
    consultationFee: 105,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
    languages: ['English', 'Arabic'],
    bio: 'Dedicated to early childhood neurodevelopment, behavioral milestones, autism assessments, childhood nutrition, and routine preventative immunizations.',
    education: [
      'MD - University of Toronto Faculty of Medicine',
      'General Pediatrics Residency - Hospital for Sick Children (SickKids), Toronto'
    ],
    fellowships: [
      'Member of the Royal College of Paediatrics and Child Health (MRCPCH)',
      'Developmental-Behavioral Pediatrics Collaborative'
    ],
    awards: [
      'Child Well-Being Champion 2023',
      'Outstanding Pediatric Communication Award'
    ],
    opdRoom: 'Suite 218, Children’s Wing',
    avatarColor: 'from-cyan-700 to-teal-900'
  },

  // Obstetrics & Gynecology Doctors
  {
    id: 'doc-klein',
    name: 'Dr. Rebecca Klein',
    title: 'Chief Obstetrician & Maternal-Fetal Medicine',
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Gynaecology (OB-GYN)',
    qualifications: 'MD, FACOG (Cornell University Weill Cornell Medicine)',
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 460,
    consultationFee: 135,
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    timeSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM'],
    languages: ['English'],
    bio: 'Dr. Rebecca Klein has guided thousands of safe deliveries, specializing in high-risk pregnancies, preeclampsia management, and personalized birth plans.',
    education: [
      'MD - Weill Cornell Medical College',
      'Ob/Gyn Residency - NewYork-Presbyterian / Weill Cornell',
      'Maternal-Fetal Medicine Fellowship - Mount Sinai Hospital'
    ],
    fellowships: [
      'Fellow of the American College of Obstetricians and Gynecologists (FACOG)',
      'Society for Maternal-Fetal Medicine (SMFM)'
    ],
    awards: [
      'Maternal Health Leadership Recognition 2024',
      'Compassionate Doctor Award - 7 Consecutive Years'
    ],
    opdRoom: 'Suite 310, Women’s Center',
    avatarColor: 'from-rose-500 to-purple-800'
  },
  {
    id: 'doc-desai',
    name: 'Dr. Anita Desai',
    title: 'Consultant Gynecologist & Laparoscopic Surgeon',
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Gynaecology (OB-GYN)',
    qualifications: 'MS, DGO, FMAS (King Edward Memorial Hospital & IRCAD France)',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 340,
    consultationFee: 125,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM'],
    languages: ['English', 'Hindi', 'Marathi'],
    bio: 'Recognized for advanced keyhole laparoscopic surgery for fibroids, endometriosis, ovarian cysts, and reproductive endocrinology.',
    education: [
      'MBBS & MS Ob/Gyn - Seth GS Medical College & KEM Hospital, Mumbai',
      'Advanced Minimal Access Surgery Diploma - IRCAD Strasbourg, France'
    ],
    fellowships: [
      'Fellowship in Minimal Access Surgery (FMAS)',
      'American Association of Gynecologic Laparoscopists (AAGL)'
    ],
    awards: [
      'Pioneer in Scarless Endometriosis Excision 2023',
      'Top Women’s Health Consultant 2024'
    ],
    opdRoom: 'Suite 314, Women’s Center',
    avatarColor: 'from-indigo-600 to-rose-700'
  },
  {
    id: 'doc-brooks',
    name: 'Dr. Lauren Brooks',
    title: 'Specialist in Urogynecology & Pelvic Health',
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Gynaecology (OB-GYN)',
    qualifications: 'MD, FACOG (Northwestern University Feinberg)',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 190,
    consultationFee: 120,
    availableDays: ['Monday', 'Tuesday', 'Friday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:30 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Dedicated to pelvic floor reconstruction, postpartum rehabilitation, urinary continence restoration, and menopausal wellness.',
    education: [
      'MD - Northwestern University Feinberg School of Medicine',
      'Female Pelvic Medicine & Reconstructive Surgery - Duke University'
    ],
    fellowships: [
      'American Urogynecologic Society (AUGS)',
      'FACOG'
    ],
    awards: [
      'Clinical Excellence in Female Pelvic Medicine 2024',
      'Patient Advocacy Honor Roll'
    ],
    opdRoom: 'Suite 318, Women’s Center',
    avatarColor: 'from-pink-600 to-indigo-900'
  },

  // Gastroenterology Doctors
  {
    id: 'doc-oconnor',
    name: 'Dr. Kenneth O’Connor',
    title: 'Senior Gastroenterologist & Endoscopy Director',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MD, FACG, FASGE (Georgetown University & Mayo Clinic)',
    experienceYears: 23,
    rating: 4.9,
    reviewCount: 388,
    consultationFee: 140,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['08:30 AM', '10:00 AM', '01:30 PM', '03:00 PM'],
    languages: ['English', 'Irish'],
    bio: 'Dr. O’Connor has performed over 20,000 endoscopic evaluations including complex polypectomies, therapeutic ERCP, and inflammatory bowel diseases.',
    education: [
      'MD - Georgetown University School of Medicine',
      'Gastroenterology & Hepatology Fellowship - Mayo Clinic, Rochester'
    ],
    fellowships: [
      'Fellow of the American College of Gastroenterology (FACG)',
      'Fellow of the American Society for Gastrointestinal Endoscopy (FASGE)'
    ],
    awards: [
      'Master Endoscopist Recognition 2023',
      'Distinguished Clinical Educator - National GI Society'
    ],
    opdRoom: 'Suite 412, Digestive Health Center',
    avatarColor: 'from-emerald-700 to-slate-900'
  },
  {
    id: 'doc-rao',
    name: 'Dr. Sunita Rao',
    title: 'Consultant Hepatologist & Liver Transplant Physician',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MD, DM, FAASLD (King’s College Hospital, London)',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 224,
    consultationFee: 135,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM'],
    languages: ['English', 'Hindi', 'Kannada'],
    bio: 'Specializes in metabolic fatty liver disease (MASH), cirrhosis complications, autoimmune hepatitis, and liver transplant physician management.',
    education: [
      'MBBS & MD Internal Medicine - Bangalore Medical College',
      'Advanced Hepatology & Transplant Fellowship - Institute of Liver Studies, King’s College London'
    ],
    fellowships: [
      'Fellow of the American Association for the Study of Liver Diseases (FAASLD)',
      'European Association for the Study of the Liver (EASL)'
    ],
    awards: [
      'Young Hepatologist Clinical Research Award 2022',
      'Excellence in Liver Care Citation 2024'
    ],
    opdRoom: 'Suite 416, Digestive Health Center',
    avatarColor: 'from-teal-700 to-blue-900'
  },

  // Additional Department Clinical Leads & Doctors
  {
    id: 'doc-chu',
    name: 'Dr. Raymond Chu',
    title: 'Director of Blood Transfusion & Immunohematology',
    departmentId: 'blood_bank',
    departmentName: 'Blood Bank & Transfusion Medicine',
    qualifications: 'MD, FCAP (Johns Hopkins University)',
    experienceYears: 17,
    rating: 4.9,
    reviewCount: 160,
    consultationFee: 100,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
    languages: ['English', 'Mandarin'],
    bio: 'Oversees 24/7 blood component supply, antibody titration, massive transfusion protocols, and therapeutic apheresis.',
    education: ['MD - Johns Hopkins', 'Transfusion Medicine - Harvard Joint Program'],
    fellowships: ['FCAP'],
    awards: ['Transfusion Safety Leadership Medal 2024'],
    opdRoom: 'Blood Bank Consultation, Suite B10',
    avatarColor: 'from-red-600 to-rose-900'
  },
  {
    id: 'doc-nadeem',
    name: 'Dr. Zoya Nadeem',
    title: 'Specialist Transfusion Physician & Hematologist',
    departmentId: 'blood_bank',
    departmentName: 'Blood Bank & Transfusion Medicine',
    qualifications: 'MD, FRCPath (Oxford University)',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 120,
    consultationFee: 95,
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    timeSlots: ['10:00 AM', '12:00 PM', '03:00 PM'],
    languages: ['English', 'Urdu'],
    bio: 'Specialist in immunohematology cross-matching, stem cell collection, and hemoglobinopathy transfusions.',
    education: ['MBBS & MD - Oxford', 'Transfusion Fellowship - NHS Blood and Transplant'],
    fellowships: ['Royal College of Pathologists UK'],
    awards: ['Young Transfusion Specialist 2023'],
    opdRoom: 'Blood Bank Consultation, Suite B12',
    avatarColor: 'from-rose-700 to-indigo-950'
  },

  {
    id: 'doc-thorne',
    name: 'Dr. Joanna Thorne',
    title: 'Head of Clinical Nutrition & Metabolic Health',
    departmentId: 'dietetics',
    departmentName: 'Dietetics & Clinical Nutrition',
    qualifications: 'PhD, RD, CNSC (Cornell University)',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 290,
    consultationFee: 90,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM'],
    languages: ['English'],
    bio: 'Provides specialized metabolic counseling for cardiovascular risk, chronic kidney disease diets, and post-bariatric nutrition.',
    education: ['PhD Nutritional Biochemistry - Cornell', 'Clinical Dietetic Internship - NewYork-Presbyterian'],
    fellowships: ['Certified Nutrition Support Clinician (CNSC)'],
    awards: ['Distinguished Clinical Dietitian 2024'],
    opdRoom: 'Suite 210, Nutrition Center',
    avatarColor: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'doc-alvarez-diet',
    name: 'Dr. Marco Alvarez',
    title: 'Senior Bariatric & Sports Nutritionist',
    departmentId: 'dietetics',
    departmentName: 'Dietetics & Clinical Nutrition',
    qualifications: 'MS, RD, CSSD (University of Florida)',
    experienceYears: 11,
    rating: 4.8,
    reviewCount: 180,
    consultationFee: 85,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:30 AM', '11:00 AM', '02:00 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Dedicated to body composition optimization, diabetic carbohydrate management, and athlete nutritional conditioning.',
    education: ['MS Dietetics - UF', 'Sports Nutrition Fellowship - Australian Institute of Sport'],
    fellowships: ['Board Certified Specialist in Sports Dietetics (CSSD)'],
    awards: ['Outstanding Young Dietitian Award 2023'],
    opdRoom: 'Suite 212, Nutrition Center',
    avatarColor: 'from-green-600 to-slate-800'
  },

  {
    id: 'doc-wallace-opd',
    name: 'Dr. Nathan Wallace',
    title: 'Chief Outpatient Physician & Internist',
    departmentId: 'opd',
    departmentName: 'Outpatient Department (OPD) & Specialty Clinics',
    qualifications: 'MD, FACP (University of Pennsylvania)',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 420,
    consultationFee: 110,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['08:30 AM', '10:00 AM', '01:00 PM', '03:30 PM'],
    languages: ['English'],
    bio: 'Senior consultant physician in comprehensive adult medicine, chronic hypertension, preventative geriatrics, and health checkups.',
    education: ['MD - UPenn Perelman', 'Internal Medicine - Penn Medicine'],
    fellowships: ['Fellow of the American College of Physicians (FACP)'],
    awards: ['Top Primary & Specialty Physician Award 2024'],
    opdRoom: 'Suite 101, Main Outpatient Suite',
    avatarColor: 'from-sky-700 to-indigo-900'
  },
  {
    id: 'doc-kim-opd',
    name: 'Dr. Stephanie Kim',
    title: 'Consultant Preventative Medicine & Executive Health',
    departmentId: 'opd',
    departmentName: 'Outpatient Department (OPD) & Specialty Clinics',
    qualifications: 'MD, MPH (Harvard T.H. Chan School of Public Health)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 280,
    consultationFee: 115,
    availableDays: ['Monday', 'Wednesday', 'Saturday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
    languages: ['English', 'Korean'],
    bio: 'Specializes in risk factor stratification, executive wellness screenings, adult vaccinations, and metabolic prevention.',
    education: ['MD - Northwestern Feinberg', 'MPH - Harvard School of Public Health'],
    fellowships: ['American College of Preventive Medicine'],
    awards: ['Preventative Healthcare Champion 2023'],
    opdRoom: 'Suite 104, Main Outpatient Suite',
    avatarColor: 'from-blue-600 to-cyan-800'
  },

  {
    id: 'doc-gomez-ipd',
    name: 'Dr. Alicia Gomez',
    title: 'Director of Hospital Medicine & Inpatient Care',
    departmentId: 'ipd',
    departmentName: 'Inpatient Department (IPD) & Specialty Wards',
    qualifications: 'MD, FHM (Baylor College of Medicine)',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 310,
    consultationFee: 120,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '01:00 PM', '04:00 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Oversees 24/7 inpatient medical rounds, complex acute medical admissions, and multi-specialty coordination.',
    education: ['MD - Baylor', 'Residency - Houston Methodist'],
    fellowships: ['Fellow in Hospital Medicine (FHM)'],
    awards: ['Inpatient Safety Excellence Award 2024'],
    opdRoom: 'Ward Administrative Station, Level 3',
    avatarColor: 'from-indigo-600 to-slate-800'
  },
  {
    id: 'doc-wright-ipd',
    name: 'Dr. Robert Wright',
    title: 'Senior Attending Hospitalist Physician',
    departmentId: 'ipd',
    departmentName: 'Inpatient Department (IPD) & Specialty Wards',
    qualifications: 'MD, FACP (University of Virginia)',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 205,
    consultationFee: 115,
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    timeSlots: ['10:00 AM', '02:00 PM', '05:00 PM'],
    languages: ['English'],
    bio: 'Expert in post-surgical inpatient care, geriatric recovery, cardiac telemetry oversight, and bedside safety.',
    education: ['MD - UVA School of Medicine', 'Internal Medicine - Inova Fairfax'],
    fellowships: ['Society of Hospital Medicine'],
    awards: ['Compassionate Inpatient Doctor 2023'],
    opdRoom: 'Ward Administrative Station, Level 4',
    avatarColor: 'from-blue-700 to-teal-900'
  },

  // Leadership & Support Heads
  {
    id: 'doc-harrison-exec',
    name: 'Eleanor Harrison',
    title: 'Chief Operating Officer & Patient Relations Director',
    departmentId: 'administration',
    departmentName: 'Administration & Management',
    qualifications: 'MHA, FACHE (Cornell University)',
    experienceYears: 24,
    rating: 4.9,
    reviewCount: 150,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['10:00 AM', '02:00 PM'],
    languages: ['English'],
    bio: 'Oversees institutional clinical governance, patient advocacy committees, and international healthcare partnerships.',
    education: ['MHA - Cornell', 'Healthcare Operations - Harvard Executive Program'],
    fellowships: ['Fellow of the American College of Healthcare Executives (FACHE)'],
    awards: ['Hospital Executive of the Year 2024'],
    opdRoom: 'Executive Suite 501',
    avatarColor: 'from-slate-700 to-blue-900'
  },
  {
    id: 'doc-billing-lead',
    name: 'Marcus Sterling',
    title: 'Director of Healthcare Finance & Insurance Services',
    departmentId: 'billing',
    departmentName: 'Billing & Finance',
    qualifications: 'CPA, FHFMA (Wharton Business School)',
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 180,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '01:00 PM'],
    languages: ['English'],
    bio: 'Directs transparent hospital pricing, cashless insurance desk approvals, and patient financial hardship grants.',
    education: ['BS Finance - Wharton', 'Healthcare Financial Management Certification'],
    fellowships: ['Fellow of Healthcare Financial Management Association (FHFMA)'],
    awards: ['Healthcare Financial Transparency Honor 2024'],
    opdRoom: 'Billing Suite 102',
    avatarColor: 'from-emerald-700 to-slate-900'
  },
  {
    id: 'doc-fin-advisor',
    name: 'Sarah Linwood',
    title: 'Chief Patient Financial Counselor',
    departmentId: 'billing',
    departmentName: 'Billing & Finance',
    qualifications: 'MS Healthcare Finance',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 140,
    consultationFee: 0,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['10:00 AM', '02:30 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Assists patients and families with health insurance coverage clarification, claims appeals, and interest-free installment planning.',
    education: ['MS Healthcare Administration - NYU'],
    fellowships: ['Certified Healthcare Financial Professional (CHFP)'],
    awards: ['Patient Advocate of Excellence 2023'],
    opdRoom: 'Billing Suite 105',
    avatarColor: 'from-teal-700 to-indigo-900'
  },
  {
    id: 'doc-bennett-cssd',
    name: 'Sister Patricia Bennett',
    title: 'Head of Central Sterile Supply & Infection Control',
    departmentId: 'cssd',
    departmentName: 'Central Sterile Supply Department (CSSD)',
    qualifications: 'RN, CRCST, CHL (Johns Hopkins School of Nursing)',
    experienceYears: 22,
    rating: 4.9,
    reviewCount: 95,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['08:00 AM', '01:00 PM'],
    languages: ['English'],
    bio: 'Guarantees surgical instrument sterility across 15 operation theatres with zero tolerance for infection risks.',
    education: ['BS Nursing - Johns Hopkins', 'Certified Registered Central Service Technician'],
    fellowships: ['IAHCSMM Fellow'],
    awards: ['National Sterilization Leader Award 2023'],
    opdRoom: 'CSSD Command Center, Level B1',
    avatarColor: 'from-cyan-700 to-slate-800'
  },
  {
    id: 'doc-steril-lead',
    name: 'James Thornton',
    title: 'Senior Surgical Instrument Quality Officer',
    departmentId: 'cssd',
    departmentName: 'Central Sterile Supply Department (CSSD)',
    qualifications: 'CRCST, CIS',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 80,
    consultationFee: 0,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['09:00 AM', '02:00 PM'],
    languages: ['English'],
    bio: 'Manages robotic instrument disassembly, ultrasonic cleansing, and barcode traceability.',
    education: ['Bio-Sterile Operations - Ohio State'],
    fellowships: ['Certified Instrument Specialist (CIS)'],
    awards: ['Precision Sterility Medal 2024'],
    opdRoom: 'CSSD Command Center, Level B1',
    avatarColor: 'from-sky-700 to-slate-900'
  },
  {
    id: 'doc-sethi-eng',
    name: 'Eng. Vikram Sethi',
    title: 'Director of Clinical Engineering & Biomedical Systems',
    departmentId: 'clinical_engineering',
    departmentName: 'Clinical Engineering / Maintenance',
    qualifications: 'CCE, MS Biomedical Engineering (Purdue University)',
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 110,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '02:00 PM'],
    languages: ['English', 'Hindi'],
    bio: 'Leads biomedical safety calibrations, medical imaging uptime, and robotic surgical unit maintenance.',
    education: ['MS BME - Purdue University', 'Certified Clinical Engineer (CCE)'],
    fellowships: ['American College of Clinical Engineering'],
    awards: ['Biomedical Engineering Innovator 2024'],
    opdRoom: 'Biomedical Facility Level 1',
    avatarColor: 'from-amber-700 to-slate-900'
  },
  {
    id: 'doc-tech-lead',
    name: 'Eng. Lisa Chen',
    title: 'Senior Medical Device Specialist',
    departmentId: 'clinical_engineering',
    departmentName: 'Clinical Engineering / Maintenance',
    qualifications: 'BS Electrical & Biomedical Engineering',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 75,
    consultationFee: 0,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['10:00 AM', '03:00 PM'],
    languages: ['English', 'Mandarin'],
    bio: 'Specialist in ventilators, anesthesia monitors, and defibrillator safety verification.',
    education: ['BS BME - Georgia Tech'],
    fellowships: ['AAMI Member'],
    awards: ['Hospital Equipment Uptime Distinction 2023'],
    opdRoom: 'Biomedical Facility Level 1',
    avatarColor: 'from-orange-700 to-slate-900'
  },
  {
    id: 'doc-mendez-house',
    name: 'Guillermo Mendez',
    title: 'Director of Environmental Services & Hospital Sanitation',
    departmentId: 'housekeeping',
    departmentName: 'Housekeeping & Sanitation',
    qualifications: 'CHESP, Master Facility Hygiene (AHE)',
    experienceYears: 21,
    rating: 4.9,
    reviewCount: 90,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['08:00 AM', '01:00 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Directs infection-preventative hospital cleaning, pulsed-xenon UV-C robotics, and biomedical waste disposal.',
    education: ['Certified Healthcare Environmental Services Professional (CHESP)'],
    fellowships: ['Association for the Healthcare Environment (AHE)'],
    awards: ['Clean Hospital Leadership Award 2024'],
    opdRoom: 'Environmental Office B1',
    avatarColor: 'from-emerald-700 to-blue-900'
  },
  {
    id: 'doc-sanit-lead',
    name: 'Maria Santos',
    title: 'Chief Infection Prevention Sanitarian',
    departmentId: 'housekeeping',
    departmentName: 'Housekeeping & Sanitation',
    qualifications: 'CHESP, Bio-Hazard Containment',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 85,
    consultationFee: 0,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:00 AM', '02:00 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Specialist in terminal operation theatre sanitation, ATP bio-luminescence hygiene auditing, and isolation room air safety.',
    education: ['Infection Prevention Training - APIC'],
    fellowships: ['AHE Member'],
    awards: ['Zero Contamination Merit 2023'],
    opdRoom: 'Environmental Office B1',
    avatarColor: 'from-teal-700 to-slate-900'
  },
  {
    id: 'doc-standish-hr',
    name: 'Claire Standish',
    title: 'Vice President of Human Resources & Medical Credentialing',
    departmentId: 'hr',
    departmentName: 'Human Resources (HR)',
    qualifications: 'SPHR, SHRM-SCP (Columbia University)',
    experienceYears: 23,
    rating: 4.9,
    reviewCount: 110,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:30 AM', '02:00 PM'],
    languages: ['English'],
    bio: 'Oversees medical credentialing, physician licensing audits, continuous nursing simulations, and clinician wellness.',
    education: ['MS Human Resource Management - Columbia University'],
    fellowships: ['Senior Professional in Human Resources (SPHR)'],
    awards: ['Healthcare Workforce Champion 2024'],
    opdRoom: 'HR Executive Suite 402',
    avatarColor: 'from-purple-700 to-slate-900'
  },
  {
    id: 'doc-hr-lead',
    name: 'Anthony Rossi',
    title: 'Director of Physician Recruitment & Credentialing',
    departmentId: 'hr',
    departmentName: 'Human Resources (HR)',
    qualifications: 'CPCS, SHRM-CP',
    experienceYears: 15,
    rating: 4.8,
    reviewCount: 95,
    consultationFee: 0,
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    timeSlots: ['10:00 AM', '03:00 PM'],
    languages: ['English', 'Italian'],
    bio: 'Leads board verification, residency checks, and state medical board privileging for all incoming hospital specialists.',
    education: ['BA - Boston College', 'Certified Provider Credentialing Specialist (CPCS)'],
    fellowships: ['NAMSS Member'],
    awards: ['Excellence in Clinical Credentialing 2023'],
    opdRoom: 'HR Executive Suite 405',
    avatarColor: 'from-blue-700 to-indigo-900'
  },
  {
    id: 'doc-miller-it',
    name: 'David A. Miller',
    title: 'Chief Information Officer & Health Informatics Director',
    departmentId: 'it',
    departmentName: 'Information Technology (IT)',
    qualifications: 'CISSP, CPHIMS, MS Computer Science (MIT)',
    experienceYears: 22,
    rating: 4.9,
    reviewCount: 120,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '02:00 PM'],
    languages: ['English'],
    bio: 'Architect of WeCare’s zero-downtime EMR, PACS medical image routing, cyber protection, and patient mobile portal.',
    education: ['MS Computer Science - MIT', 'Health Informatics Executive - Stanford'],
    fellowships: ['Certified Information Systems Security Professional (CISSP)'],
    awards: ['Healthcare CIO of the Year 2024'],
    opdRoom: 'IT Command Center, Ground Level',
    avatarColor: 'from-slate-700 to-cyan-900'
  },
  {
    id: 'doc-info-lead',
    name: 'Kavita Patel',
    title: 'Director of Clinical Informatics & Electronic Records',
    departmentId: 'it',
    departmentName: 'Information Technology (IT)',
    qualifications: 'MS Health Informatics, CPHIMS',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 90,
    consultationFee: 0,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['10:00 AM', '03:00 PM'],
    languages: ['English', 'Gujarati'],
    bio: 'Leads digital appointment scheduling, clinician EMR workflows, and HIPAA data compliance.',
    education: ['MS - University of Michigan School of Information'],
    fellowships: ['HIMSS Active Member'],
    awards: ['Digital Healthcare Pioneer 2023'],
    opdRoom: 'IT Command Center, Ground Level',
    avatarColor: 'from-sky-700 to-slate-900'
  },
  {
    id: 'doc-morales-mrd',
    name: 'Regina Morales',
    title: 'Director of Health Information Management & Records',
    departmentId: 'mrd',
    departmentName: 'Medical Records Department (MRD)',
    qualifications: 'RHIA, CDIP, MS Health Information (Emory University)',
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 130,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '01:30 PM'],
    languages: ['English', 'Spanish'],
    bio: 'Ensures immediate patient access to digital discharge summaries, medical certificates, and diagnostic archives.',
    education: ['MS Health Information - Emory University'],
    fellowships: ['Registered Health Information Administrator (RHIA)'],
    awards: ['Health Information Management Leader 2024'],
    opdRoom: 'MRD Suite G-12',
    avatarColor: 'from-amber-700 to-slate-800'
  },
  {
    id: 'doc-records-lead',
    name: 'Thomas Wright',
    title: 'Senior Medical Document Release Specialist',
    departmentId: 'mrd',
    departmentName: 'Medical Records Department (MRD)',
    qualifications: 'RHIT, Certified Coding Specialist',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 85,
    consultationFee: 0,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['10:00 AM', '02:00 PM'],
    languages: ['English'],
    bio: 'Manages patient consent requests, insurance claim records verification, and encrypted health data transfers.',
    education: ['BS Health Information - Temple University'],
    fellowships: ['AHIMA Member'],
    awards: ['Patient Privacy Excellence Award 2023'],
    opdRoom: 'MRD Suite G-14',
    avatarColor: 'from-slate-700 to-teal-900'
  },
  {
    id: 'doc-hayes-nursing',
    name: 'Mary Katherine Hayes',
    title: 'Chief Nursing Officer & VP of Patient Care Services',
    departmentId: 'nursing',
    departmentName: 'Nursing Service & Patient Care Administration',
    qualifications: 'DNP, RN, NEA-BC (Vanderbilt University)',
    experienceYears: 25,
    rating: 4.9,
    reviewCount: 280,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '02:00 PM'],
    languages: ['English'],
    bio: 'Directs over 650 registered nurses, establishing 1:1 ICU nursing ratios, patient comfort protocols, and clinical nurse mentorship.',
    education: ['Doctor of Nursing Practice (DNP) - Vanderbilt University School of Nursing'],
    fellowships: ['Nurse Executive Advanced Certified (NEA-BC)'],
    awards: ['National Nursing Leadership Luminary 2024'],
    opdRoom: 'Nursing Directorate Suite 201',
    avatarColor: 'from-rose-600 to-indigo-900'
  },
  {
    id: 'doc-nurse-supervisor',
    name: 'Deborah Jenkins',
    title: 'Director of Critical Care & Inpatient Nursing',
    departmentId: 'nursing',
    departmentName: 'Nursing Service & Patient Care Administration',
    qualifications: 'MSN, RN, CCRN',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 190,
    consultationFee: 0,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['10:00 AM', '03:00 PM'],
    languages: ['English'],
    bio: 'Supervises emergency room, ICU, and postoperative specialty nursing standards with zero medication error protocols.',
    education: ['MSN - University of Pennsylvania'],
    fellowships: ['Critical Care Registered Nurse (CCRN)'],
    awards: ['Florence Nightingale Compassion Award 2023'],
    opdRoom: 'Nursing Directorate Suite 204',
    avatarColor: 'from-pink-600 to-slate-800'
  },
  {
    id: 'doc-vance-pharm',
    name: 'Dr. Gregory Vance',
    title: 'Director of Pharmacy & Clinical Pharmacotherapy',
    departmentId: 'pharmacy',
    departmentName: 'Hospital Pharmacy & Clinical Pharmacotherapy',
    qualifications: 'PharmD, BCPS, BCOP (University of North Carolina Chapel Hill)',
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 310,
    consultationFee: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '01:00 PM'],
    languages: ['English'],
    bio: 'Oversees 24/7 hospital dispensary, sterile IV compounding cleanrooms, clinical oncology regimens, and antimicrobial stewardship.',
    education: ['PharmD - UNC Eshelman School of Pharmacy', 'Residency - Duke University Hospital'],
    fellowships: ['Board Certified Pharmacotherapy Specialist (BCPS)'],
    awards: ['Hospital Pharmacist of the Year 2024'],
    opdRoom: 'Central Pharmacy Consultation Desk',
    avatarColor: 'from-emerald-600 to-blue-900'
  },
  {
    id: 'doc-pharm-lead',
    name: 'Dr. Priya Sundaram',
    title: 'Senior Clinical Specialist in Oncology & IV Compounding',
    departmentId: 'pharmacy',
    departmentName: 'Hospital Pharmacy & Clinical Pharmacotherapy',
    qualifications: 'PharmD, BCOP (Purdue University)',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 165,
    consultationFee: 0,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['10:00 AM', '02:00 PM'],
    languages: ['English', 'Tamil'],
    bio: 'Specialist in hazardous chemotherapy aseptic compounding, pediatric dose calculations, and adverse interaction screening.',
    education: ['PharmD - Purdue University', 'Oncology Residency - MD Anderson'],
    fellowships: ['Board Certified Oncology Pharmacist (BCOP)'],
    awards: ['Sterile Compounding Safety Medal 2023'],
    opdRoom: 'Central Pharmacy Consultation Desk',
    avatarColor: 'from-teal-600 to-slate-900'
  }
];

export const HOSPITAL_STATS = [
  { value: '450+', label: 'Licensed Inpatient Beds', note: 'Single & companion suites' },
  { value: '120+', label: 'Board-Certified Specialists', note: 'Across 22 departments' },
  { value: '24/7', label: 'Accident & Emergency', note: 'Level-1 Trauma & Triage' },
  { value: '98.6%', label: 'Patient Satisfaction', note: 'Verified post-discharge index' },
  { value: '35,000+', label: 'Surgeries Handled Annually', note: 'Low infection < 0.2%' },
  { value: '15', label: 'Advanced Modular OTs', note: 'With robotic surgery suites' }
];

export const HOSPITAL_FACILITIES: HospitalFacility[] = [
  {
    id: 'fac-1',
    title: 'Advanced Robotic Surgical Suites',
    description: 'Equipped with Da Vinci Xi robotic systems and Mako orthopedic robotics for sub-millimeter surgical precision, rapid recovery, and minimal blood loss.',
    category: 'Surgical Excellence',
    stat: '3 Robotic Theatres'
  },
  {
    id: 'fac-2',
    title: '24/7 Emergency & Rapid Helipad',
    description: 'Direct air-ambulance helipad on Building A rooftop with high-speed elevator access to trauma resuscitation bays and cardiac cath labs.',
    category: 'Emergency Response',
    stat: 'Zero-Wait Triage'
  },
  {
    id: 'fac-3',
    title: 'Precision Diagnostics & 3T MRI',
    description: 'Ultra-fast 512-slice CT scanner, 3.0 Tesla Silent MRI, digital PET-CT, and automated pathology laboratories delivering rapid, certified findings.',
    category: 'Diagnostic Radiology',
    stat: 'Same-Day Diagnostics'
  },
  {
    id: 'fac-4',
    title: 'Dedicated Intensive Care Units',
    description: 'Specialized 75 ICU beds divided into Medical ICU, Surgical ICU, Neuro ICU, CCU, and Level-III NICU with 1:1 patient-to-nurse ratios.',
    category: 'Critical Care',
    stat: '75 Total ICU Beds'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Eleanor Vance-Campbell',
    treatment: 'Robotic Total Knee Replacement',
    department: 'Orthopaedics & Joint Replacement',
    doctorName: 'Dr. Robert Sterling',
    quote: 'I had avoided knee surgery for six years out of anxiety. Dr. Sterling and the robotic surgical team at WeCare had me standing and walking pain-free the very next morning. The nursing care was extraordinary.',
    rating: 5,
    date: 'February 2026'
  },
  {
    id: 'test-2',
    patientName: 'David H. Miller',
    treatment: 'Emergency Primary Angioplasty (Door-to-Balloon 38 mins)',
    department: 'Cardiology & Heart Care',
    doctorName: 'Dr. Marcus Vance',
    quote: 'When chest pain struck suddenly at 2 AM, the WeCare trauma bay moved like clockwork. Dr. Vance placed two stents within 40 minutes of my arrival. They saved my life, plain and simple.',
    rating: 5,
    date: 'January 2026'
  },
  {
    id: 'test-3',
    patientName: 'Sofia & Carlos Mendoza',
    treatment: 'Level-III NICU & High-Risk Delivery',
    department: 'Paediatrics & Neonatology (NICU)',
    doctorName: 'Dr. Emily Zhao & Dr. Rebecca Klein',
    quote: 'Our twins were born 7 weeks early. The tenderness, transparent daily updates, and world-class care in the WeCare NICU brought our babies home healthy. We will never forget this team.',
    rating: 5,
    date: 'March 2026'
  }
];

export const INITIAL_SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-sample-1',
    referenceNumber: 'WCH-2026-8941',
    patientName: 'Arthur Pendelton',
    patientPhone: '+1 (555) 389-1029',
    patientEmail: 'arthur.p@example.com',
    age: 58,
    gender: 'male',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Care',
    doctorId: 'doc-vance',
    doctorName: 'Dr. Marcus Vance',
    doctorTitle: 'Chief of Cardiology',
    date: '2026-11-04',
    timeSlot: '10:30 AM',
    consultationType: 'in_person',
    symptoms: 'Routine cardiovascular stress test follow-up and blood pressure adjustment.',
    notes: 'Please bring existing medication list and previous ECG traces.',
    status: 'confirmed',
    fee: 140,
    createdAt: '2026-10-24T14:20:00.000Z'
  },
  {
    id: 'apt-sample-2',
    referenceNumber: 'WCH-2026-6102',
    patientName: 'Clara Henderson',
    patientPhone: '+1 (555) 742-8921',
    patientEmail: 'clara.h@example.com',
    age: 34,
    gender: 'female',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    doctorId: 'doc-jenkins',
    doctorName: 'Dr. Sarah Jenkins',
    doctorTitle: 'Chief Neurologist',
    date: '2026-11-06',
    timeSlot: '01:30 PM',
    consultationType: 'video',
    symptoms: 'Recurring migraine with aura and visual sensitivity assessment.',
    notes: 'Secure video link will be activated 10 minutes prior to the session.',
    status: 'confirmed',
    fee: 135,
    createdAt: '2026-10-25T08:15:00.000Z'
  }
];

export const ACCREDITATIONS = [
  { name: 'Joint Commission International (JCI)', note: 'Gold Seal of Approval for Patient Safety' },
  { name: 'ISO 9001:2015 Healthcare Certified', note: 'Standardized Clinical Quality Systems' },
  { name: 'College of American Pathologists (CAP)', note: 'Accredited Diagnostic Laboratories' },
  { name: 'Level-1 Trauma Verification', note: 'Highest standard for emergency surgery' }
];

export const FREQUENT_QUESTIONS = [
  {
    q: 'How do I book an appointment at WeCare Hospitals?',
    a: 'You can easily book online through our Appointment Booking feature on this website, select your preferred doctor or department, pick a convenient date/time, and receive instant digital confirmation. You can also call our centralized outpatient desk at (555) 019-CARE.'
  },
  {
    q: 'Do you offer teleconsultation / video appointments?',
    a: 'Yes. For non-emergent follow-ups, second opinions, and medical reviews, you can select "Video Teleconsultation" during booking to speak with your physician securely from home.'
  },
  {
    q: 'What should I bring for my first consultation?',
    a: 'Please bring a photo ID, insurance card (if applicable), list of current prescription medicines, and any previous diagnostic scans, MRI/CT discs, or laboratory reports related to your health condition.'
  },
  {
    q: 'How does emergency triage work at WeCare Hospitals?',
    a: 'Our Level-1 Emergency & Trauma Unit is open 24/7/365 with zero waiting for critical patients. High-priority cardiac, stroke, and trauma cases are immediately transferred to dedicated resuscitation suites upon arrival.'
  },
  {
    q: 'What insurance networks are accepted?',
    a: 'WeCare Hospitals works with all major international and domestic health insurance providers, including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and regional cashless insurance networks.'
  }
];
