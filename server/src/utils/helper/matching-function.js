const calculateMatchScore = (mentor, mentee) => {
    const mentorSkills = mentor.skills || [];
    const menteeInterests = mentee.interests || [];

    console.log(mentorSkills);
    console.log(menteeInterests);

  
    // Matching interests with skills
    const skillMatches = mentorSkills.filter(skill => menteeInterests.includes(skill)).length;

    console.log(skillMatches);
  
    return skillMatches; // Higher is better
};
  
module.exports={
    calculateMatchScore
}