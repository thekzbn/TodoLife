// Bible Verses Collection
const bibleVerses = [
    {
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
        reference: "Jeremiah 29:11"
    },
    {
        text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        reference: "Proverbs 3:5-6"
    },
    {
        text: "I can do all things through Christ who strengthens me.",
        reference: "Philippians 4:13"
    },
    {
        text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        reference: "Romans 8:28"
    },
    {
        text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        reference: "Joshua 1:9"
    },
    {
        text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
        reference: "Zephaniah 3:17"
    },
    {
        text: "Cast all your anxiety on him because he cares for you.",
        reference: "1 Peter 5:7"
    },
    {
        text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        reference: "Isaiah 40:31"
    },
    {
        text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
        reference: "Psalm 23:1-3"
    },
    {
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        reference: "Philippians 4:6-7"
    },
    {
        text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        reference: "Joshua 1:9"
    },
    {
        text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
        reference: "Matthew 6:34"
    },
    {
        text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
        reference: "Psalm 34:18"
    },
    {
        text: "Delight yourself in the Lord, and he will give you the desires of your heart.",
        reference: "Psalm 37:4"
    },
    {
        text: "Come to me, all you who are weary and burdened, and I will give you rest.",
        reference: "Matthew 11:28"
    },
    {
        text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
        reference: "Philippians 4:19"
    },
    {
        text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.",
        reference: "Proverbs 18:10"
    },
    {
        text: "She is clothed with strength and dignity; she can laugh at the days to come.",
        reference: "Proverbs 31:25"
    },
    {
        text: "In their hearts humans plan their course, but the Lord establishes their steps.",
        reference: "Proverbs 16:9"
    },
    {
        text: "The Lord will fight for you; you need only to be still.",
        reference: "Exodus 14:14"
    },
    {
        text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
        reference: "Matthew 6:33"
    },
    {
        text: "The heart of man plans his way, but the Lord establishes his steps.",
        reference: "Proverbs 16:9"
    },
    {
        text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
        reference: "2 Corinthians 5:17"
    },
    {
        text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.",
        reference: "Ephesians 2:8"
    },
    {
        text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.",
        reference: "Galatians 5:22-23"
    },
    {
        text: "Above all else, guard your heart, for everything you do flows from it.",
        reference: "Proverbs 4:23"
    },
    {
        text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?",
        reference: "Psalm 27:1"
    },
    {
        text: "Yet this I call to mind and therefore I have hope: Because of the Lord's great love we are not consumed, for his compassions never fail.",
        reference: "Lamentations 3:21-22"
    },
    {
        text: "Be completely humble and gentle; be patient, bearing with one another in love.",
        reference: "Ephesians 4:2"
    },
    {
        text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
        reference: "Galatians 6:9"
    },
    {
        text: "The joy of the Lord is your strength.",
        reference: "Nehemiah 8:10"
    },
    {
        text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
        reference: "Ephesians 4:32"
    },
    {
        text: "Commit to the Lord whatever you do, and he will establish your plans.",
        reference: "Proverbs 16:3"
    },
    {
        text: "The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing.",
        reference: "Zephaniah 3:17"
    },
    {
        text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
        reference: "Romans 8:28"
    },
    {
        text: "Many are the plans in a person's heart, but it is the Lord's purpose that prevails.",
        reference: "Proverbs 19:21"
    },
    {
        text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.",
        reference: "Numbers 6:24-26"
    },
    {
        text: "Therefore encourage one another and build each other up, just as in fact you are doing.",
        reference: "1 Thessalonians 5:11"
    },
    {
        text: "As iron sharpens iron, so one person sharpens another.",
        reference: "Proverbs 27:17"
    },
    {
        text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
        reference: "1 Corinthians 13:4-5"
    },
    {
        text: "This is the day the Lord has made; let us rejoice and be glad in it.",
        reference: "Psalm 118:24"
    },
    {
        text: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows.",
        reference: "James 1:17"
    },
    {
        text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'",
        reference: "2 Corinthians 12:9"
    },
    {
        text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.",
        reference: "Psalm 28:7"
    },
    {
        text: "Wait for the Lord; be strong and take heart and wait for the Lord.",
        reference: "Psalm 27:14"
    },
    {
        text: "And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.",
        reference: "2 Corinthians 9:8"
    },
    {
        text: "Blessed is the one who trusts in the Lord, whose confidence is in him.",
        reference: "Jeremiah 17:7"
    },
    {
        text: "The Lord is good, a refuge in times of trouble. He cares for those who trust in him.",
        reference: "Nahum 1:7"
    },
    {
        text: "Give thanks to the Lord, for he is good; his love endures forever.",
        reference: "Psalm 107:1"
    },
    {
        text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
        reference: "John 14:27"
    }
];

// Get verse for specific date (deterministic based on date)
function getVerseForDate(date) {
    // Create a simple hash from the date to ensure same verse for same date
    const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use absolute value and modulo to get consistent index
    const index = Math.abs(hash) % bibleVerses.length;
    return bibleVerses[index];
}

// Get random verse
function getRandomVerse() {
    const index = Math.floor(Math.random() * bibleVerses.length);
    return bibleVerses[index];
}

// Display verse in the daily view
function displayVerse(date) {
    const verse = getVerseForDate(date);
    document.getElementById('verseText').textContent = verse.text;
    document.getElementById('verseReference').textContent = verse.reference;
}