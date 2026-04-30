import { connection } from "../config/db.js";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/fr.js'

dayjs.extend(relativeTime)
dayjs.locale('fr')


export class Message{
    async create(content){
        const [result]=await connection.execute('INSERT INTO message SET content =?, created_at=? ', [content, new Date()]);
        return result;
    }

    async all(){
        const [rows]= await connection.execute('SELECT * FROM message');
        rows.forEach(row=>{row.created_at=this.formatRelativeDate(row.created_at)});
        return rows;
    }

    formatRelativeDate(date) {
        const now = dayjs();
        const d = dayjs(date);
    
        if (now.diff(d, 'day') > 7) {
            return d.format('DD MMM YYYY');
        }
    
        return d.fromNow();
    }
}
