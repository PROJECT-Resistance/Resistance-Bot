const { GuildMember, GuildMemberManager, GuildMemberRoleManager } = require("discord.js");

module.exports = {
    name: 'main',
    description: "accepts application for main server",
    execute(message, args){
        //command goes here
        message.channel.send('Command detected');
        /* const role = message.guild.roles.cache.find(role => role.name === 'Approved');
        const member = message.mentions.members.first();
        member.roles.add(role);
        message.channel.send('Command executed'); */
    }
}
