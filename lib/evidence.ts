import type { EvidenceSourceId } from "./types";

export type ResearchSource = {
  citation: string;
  authors: string;
  title: string;
  publication: string;
  url: string;
  plainLanguageAbstract: string;
};

export const researchSources: Record<EvidenceSourceId, ResearchSource> = {
  retrieval: {
    citation: "Roediger & Karpicke (2006)",
    authors: "Henry L. Roediger III and Jeffrey D. Karpicke",
    title: "The Power of Testing Memory: Basic Research and Implications for Educational Practice",
    publication: "Perspectives on Psychological Science, 1(3), 181–210",
    url: "https://doi.org/10.1111/j.1745-6916.2006.00012.x",
    plainLanguageAbstract: "This review examined laboratory and classroom research on the testing effect. Recalling material from memory generally produced better later retention than spending the same time restudying it, including in many studies where the practice test itself had no feedback.",
  },
  workedExamples: {
    citation: "Sweller & Cooper (1985)",
    authors: "John Sweller and Graham A. Cooper",
    title: "The Use of Worked Examples as a Substitute for Problem Solving in Learning Algebra",
    publication: "Cognition and Instruction, 2(1), 59–89",
    url: "https://doi.org/10.1207/s1532690xci0201_3",
    plainLanguageAbstract: "Across five experiments, the researchers studied how people learn the knowledge needed to solve algebra problems. Worked examples helped early learners acquire useful problem-solving structures more efficiently than relying only on conventional problem-solving practice.",
  },
  utilityValue: {
    citation: "Hulleman & Harackiewicz (2009)",
    authors: "Chris S. Hulleman and Judith M. Harackiewicz",
    title: "Promoting Interest and Performance in High School Science Classes",
    publication: "Science, 326(5958), 1410–1412",
    url: "https://pubmed.ncbi.nlm.nih.gov/19965759/",
    plainLanguageAbstract: "In a randomized high-school field experiment, students wrote about how science material connected with their own lives. The activity increased interest and course grades most clearly among students who began with lower expectations of succeeding.",
  },
  implementation: {
    citation: "Gollwitzer & Sheeran (2006)",
    authors: "Peter M. Gollwitzer and Paschal Sheeran",
    title: "Implementation Intentions and Goal Achievement: A Meta-Analysis of Effects and Processes",
    publication: "Advances in Experimental Social Psychology, 38, 69–119",
    url: "https://doi.org/10.1016/S0065-2601%2806%2938002-1",
    plainLanguageAbstract: "This meta-analysis combined 94 independent tests of if-then plans that specify when, where, and how someone will act. On average, these plans had a medium-to-large positive effect on goal attainment and helped people begin and protect goal-directed action.",
  },
  listening: {
    citation: "Weger et al. (2014)",
    authors: "Harry Weger Jr., Gina Castle Bell, Elizabeth M. Minei, and Melissa C. Robinson",
    title: "The Relative Effectiveness of Active Listening in Initial Interactions",
    publication: "International Journal of Listening, 28(1), 13–31",
    url: "https://doi.org/10.1080/10904018.2013.813234",
    plainLanguageAbstract: "This experiment compared active listening, unsolicited advice, and simple acknowledgments in initial conversations. Active-listening responses made speakers feel more understood, although they were not uniformly better than advice on every conversation outcome.",
  },
  apology: {
    citation: "Lewicki, Polin, & Lount (2016)",
    authors: "Roy J. Lewicki, Beth Polin, and Robert B. Lount Jr.",
    title: "An Exploration of the Structure of Effective Apologies",
    publication: "Negotiation and Conflict Management Research, 9(2), 177–196",
    url: "https://doi.org/10.1111/ncmr.12073",
    plainLanguageAbstract: "Two studies compared how people evaluated different components of apologies after imagined trust violations. Acknowledging responsibility and offering to repair the harm were especially important, while apologies containing more relevant components were generally rated as more effective.",
  },
  assertiveness: {
    citation: "ElBarazi et al. (2024)",
    authors: "Amani Safwat ElBarazi, Farah Mohamed, Maram Mabrok, Ahmed Adel, Ahmed Abouelkheir, Rana Ayman, Maram Mustfa, Mohamed Elmosallamy, Raneem Yasser, and Fatima Mohamed",
    title: "Efficiency of Assertiveness Training on the Stress, Anxiety, and Depression Levels of College Students",
    publication: "Journal of Education and Health Promotion, 13, 203",
    url: "https://pubmed.ncbi.nlm.nih.gov/39268439/",
    plainLanguageAbstract: "One hundred college students were randomly assigned to an eight-session program or a comparison group. The program included assertiveness, mindfulness, and problem-solving practice and produced improvements in assertiveness and psychological distress, so its effects cannot be credited to assertiveness alone.",
  },
  affectLabeling: {
    citation: "Lieberman et al. (2007)",
    authors: "Matthew D. Lieberman, Naomi I. Eisenberger, Molly J. Crockett, Sabrina M. Tom, Jennifer H. Pfeifer, and Baldwin M. Way",
    title: "Putting Feelings Into Words: Affect Labeling Disrupts Amygdala Activity in Response to Affective Stimuli",
    publication: "Psychological Science, 18(5), 421–428",
    url: "https://pubmed.ncbi.nlm.nih.gov/17576282/",
    plainLanguageAbstract: "In an fMRI experiment, labeling the emotion shown in a negative image was associated with lower activity in the amygdala and other emotion-related regions than other labeling tasks. The study suggests a possible immediate brain mechanism for affect labeling, but it did not test lasting symptom improvement.",
  },
  worry: {
    citation: "McCarrick et al. (2025)",
    authors: "Dane McCarrick, Andrew Prestwich, Eamonn Ferguson, and Daryl B. O’Connor",
    title: "Effects of Worry Postponement on Daily Worry and Sleep: A Randomised Controlled Trial",
    publication: "Psychology & Health, advance online publication",
    url: "https://doi.org/10.1080/08870446.2025.2590072",
    plainLanguageAbstract: "In a 14-day online trial with 186 participants, worry postponement paired with a specific implementation plan reduced daily worry duration compared with standard worry postponement alone. The intervention groups did not clearly outperform the active control overall, and sleep outcomes did not improve.",
  },
  music: {
    citation: "de Witte et al. (2020)",
    authors: "Martina de Witte, Anouk Spruit, Susan van Hooren, Xavier Moonen, and Geert-Jan Stams",
    title: "Effects of Music Interventions on Stress-Related Outcomes: A Systematic Review and Two Meta-Analyses",
    publication: "Health Psychology Review, 14(2), 294–324",
    url: "https://pubmed.ncbi.nlm.nih.gov/31167611/",
    plainLanguageAbstract: "The researchers combined 104 randomized trials involving 9,617 participants. Music interventions had small-to-medium average effects on physiological stress measures and medium average effects on psychological stress measures, although the studies and interventions varied widely.",
  },
  exercise: {
    citation: "Connor et al. (2023)",
    authors: "Madeleine Connor, Elaine A. Hargreaves, Orla K. Scanlon, and Olivia K. Harrison",
    title: "The Effect of Acute Exercise on State Anxiety: A Systematic Review",
    publication: "Sports, 11(8), 145",
    url: "https://pubmed.ncbi.nlm.nih.gov/37624125/",
    plainLanguageAbstract: "This review examined nine recent studies containing 13 single-session exercise conditions in healthy adults. Seven conditions reduced anxiety, but only four clearly outperformed a control, and no consistent best activity, duration, or intensity emerged.",
  },
  selfEfficacy: {
    citation: "Bandura (1977)",
    authors: "Albert Bandura",
    title: "Self-Efficacy: Toward a Unifying Theory of Behavioral Change",
    publication: "Psychological Review, 84(2), 191–215",
    url: "https://pubmed.ncbi.nlm.nih.gov/847061/",
    plainLanguageAbstract: "This foundational theoretical paper proposed that beliefs about personal capability influence whether people begin an action, how much effort they use, and how long they persist. It identified successful performance, observing others, encouragement, and physiological information as important sources of self-efficacy beliefs.",
  },
  monitoring: {
    citation: "Harkin et al. (2016)",
    authors: "Benjamin Harkin, Thomas L. Webb, Betty P. I. Chang, Andrew Prestwich, Mark Conner, Ian Kellar, Yvonne Benn, and Paschal Sheeran",
    title: "Does Monitoring Goal Progress Promote Goal Attainment? A Meta-Analysis of the Experimental Evidence",
    publication: "Psychological Bulletin, 142(2), 198–229",
    url: "https://pubmed.ncbi.nlm.nih.gov/26479070/",
    plainLanguageAbstract: "This meta-analysis synthesized 138 studies testing interventions that increased progress monitoring. Monitoring produced a small-to-medium improvement in goal attainment, with larger effects when progress was physically recorded or made public.",
  },
  reflection: {
    citation: "Fiodorova & Farb (2022)",
    authors: "Anna Fiodorova and Norman Farb",
    title: "Brief Daily Self-Care Reflection for Undergraduate Well-Being: A Randomized Control Trial of an Online Intervention",
    publication: "Anxiety, Stress, & Coping, 35(2), 158–170",
    url: "https://pubmed.ncbi.nlm.nih.gov/34313502/",
    plainLanguageAbstract: "Ninety-five undergraduates were assigned to three weeks of daily self-care reflection or a control condition. Repeated reflection helped prevent stress and negative affect from accumulating across the study, but the small sample and repeated format limit what can be inferred about a single reflection.",
  },
  personalityContext: {
    citation: "Fleeson (2001)",
    authors: "William Fleeson",
    title: "Toward a Structure- and Process-Integrated View of Personality: Traits as Density Distributions of States",
    publication: "Journal of Personality and Social Psychology, 80(6), 1011–1027",
    url: "https://pubmed.ncbi.nlm.nih.gov/11414368/",
    plainLanguageAbstract: "Three experience-sampling studies followed everyday Big Five-related behavior for two to three weeks. People showed substantial variation from one situation to another while still maintaining stable individual averages, supporting a view of traits as tendencies rather than fixed behavior.",
  },
  youthLeisure: {
    citation: "Asquith et al. (2022)",
    authors: "Sarah L. Asquith, Xu Wang, Daniel S. Quintana, and Anna Abraham",
    title: "The Role of Personality Traits and Leisure Activities in Predicting Wellbeing in Young People",
    publication: "BMC Psychology, 10, 249",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9636694/",
    plainLanguageAbstract: "This observational study examined 391 people ages 14 to 20. Social and physical activities predicted some aspects of well-being alongside personality, but the cross-sectional design cannot show that the activities caused those outcomes.",
  },
  activityFit: {
    citation: "Kuper et al. (2023)",
    authors: "Niclas Kuper, Lara Kroencke, Gabriella M. Harari, and Jaap J. A. Denissen",
    title: "Who Benefits From Which Activity? On the Relations Between Personality Traits, Leisure Activities, and Well-Being",
    publication: "Journal of Personality and Social Psychology, 125(1), 141–172",
    url: "https://pubmed.ncbi.nlm.nih.gov/36326676/",
    plainLanguageAbstract: "Using 11 annual waves from 12,703 participants, the researchers examined activity, personality, and well-being over time. Personality did not reliably identify who experienced greater within-person well-being benefits from particular leisure activities; the interaction effects were generally very small.",
  },
  selfDetermination: {
    citation: "Ryan & Deci (2000)",
    authors: "Richard M. Ryan and Edward L. Deci",
    title: "Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being",
    publication: "American Psychologist, 55(1), 68–78",
    url: "https://pubmed.ncbi.nlm.nih.gov/11392867/",
    plainLanguageAbstract: "This foundational review describes how social conditions can support or undermine motivation and healthy development. It proposes autonomy, competence, and relatedness as three basic psychological needs connected with self-motivation and well-being across settings.",
  },
};
