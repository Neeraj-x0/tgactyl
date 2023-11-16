const mdClient = require("../lib/mongodb");
mdClient.connect();

const member = mdClient.db("MyBotDataDB").collection("users");

const createMembersData = (jid) => {
    member.findOne({ _id: jid }).then(res => {
        if (res == null) {
            member.insertOne({
                _id: jid
            })
        } else {
           
        }
       
    })
}
const getMemberData = (jid) => {
    return member.findOne({ _id: jid }).then(res => {
        return res;
    }).catch(err => {
        console.log(err);
        return -1;
    });
}

const memberCount = () => {
    return new Promise((resolve, reject) => {
        member.countDocuments({}, (err, count) => {
            if (err) {
                reject(err);
            } else {
                resolve(count);
            }
        });
    });
};

module.exports = { createMembersData, getMemberData }