const { Op } = require('sequelize');
const {Profile, Connection}= require('../models');


class MatchingAlgorithm {
    async findPotentialMatches(currentProfile, desiredRole) {
    // Determine opposite role for matching
        const matchRole = desiredRole === 'mentee' ? 'mentor' : 'mentee';

        // Find matches based on skills and interests overlap
        const matches = await Profile.findAll({
        where: {
            role: matchRole,
            [Op.or]: [
            // Match if any skills overlap
            { skills: { 
                [Op.overlap]: currentProfile.interests 
            }},
            // Match if any interests overlap
            { interests: { 
                [Op.overlap]: currentProfile.skills 
            }}
            ],
            // Exclude already connected or requested profiles
            id: {
                [Op.notIn]: await this.getExistingConnections(currentProfile.id)
            }
        },
        limit: 10  // Limit to 10 matches
        });

        // Calculate match score
        return matches.map(match => ({
            profile: match,
            matchScore: this.calculateMatchScore(currentProfile, match)
        })).sort((a, b) => b.matchScore - a.matchScore);
  }
    calculateMatchScore(profile1, profile2) {
        const skillsOverlap = profile1.skills.filter(skill => 
        profile2.skills.includes(skill)
        ).length;

        const interestsOverlap = profile1.interests.filter(interest => 
        profile2.interests.includes(interest)
        ).length;

        // Weight skills more heavily than interests
        return Math.min(
        (skillsOverlap * 0.7 + interestsOverlap * 0.3) / 
        Math.max(profile1.skills.length, profile2.skills.length) * 100, 
        100
        );
  }
    async getExistingConnections(profileId) {
        const connections = await Connection.findAll({
        where: {
            [Op.or]: [
            { mentorId: profileId },
            { menteeId: profileId }
            ],
            status: { [Op.ne]: 'rejected' }
        }
        });

        return connections.map(conn => 
        conn.mentorId === profileId ? conn.menteeId : conn.mentorId
        );
  }
}

module.exports = MatchingAlgorithm;