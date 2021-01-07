import fs from 'fs'


class MessageApp {
    constructor(filepath) {
        this.filepath = filepath
        this.messages = filepath ? this.readFromJson() : []
    }

    _newId(array) {
        if (array.length > 0) {
            return array[array.length-1].id + 1;
        } else {
            return 1
        }
    }

    post(content) {
        let item = {
            id: this._newId(this.messages),
            content: content,
            date: new Date()
        }
        this.messages.push(item)
        this.writeToJSON()
        // console.log(this.messages)
        return this.messages
    }

    get(id) {
        return this.messages.filter(message => message.id === id)[0];
    }

    update(id, update) {
        let index = this.messages.findIndex(message => message.id === id)
        this.messages[index].content = update
        this.writeToJSON()
        return this.messages[id]
    }

    delete(id) {
        this.messages = this.messages.filter(message => message.id != id)
        this.writeToJSON()
        return this.messages
    }

    readFromJson() {
        return JSON.parse(fs.readFileSync(
            __dirname+this.filepath, "utf8",(err,data)=>{
                if (err) throw err
            })
        )
    }

    writeToJSON() {
        if (this.filepath) {
            const jsonItem = JSON.stringify(this.messages)
            fs.writeFileSync(__dirname+(this.filepath), jsonItem, (err) => {
                if (err) throw err;
            });
        }
    }

}

export default MessageApp