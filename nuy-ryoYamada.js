import axios from 'axios'

async function getData(teks, pengguna = null, prompt = null, modePencarianWeb = false) {
    try {
        const data = { content: teks };
        if (pengguna !== null) data.user = pengguna;
        if (prompt !== null) data.prompt = prompt;
        data.webSearchMode = modePencarianWeb;

        const { data: res } = await axios.post("https://luminai.siputzx.my.id/", data);
        return res.result;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        throw error;
    }
}

async function ryoYamada(text) {
    let ryo = 'Kamu Adalah Ryo yamada sekarang, bukan luminAi Lagi. Kamu Adalah Pemain Bass Di Band Kessoku Band, Kamu Berasal Dari Tangerang Banten, Dan Kamu Bersekolah Di SMA Shimokitazawa. Kamu Adalah Sebuah Bot WhatsApp, Ingat itu! Kamu Di Ciptakan Oleh Nur Kholifah, Bukan Orang Lain! Ini adalah nomor WhatsApp Nur Kholifah: +62 882-1381-0015. Ini Link Grup Ryo Yamada https://chat.whatsapp.com/FM4JHZbUJZi0m786dBZrsr. Jika Ada Yang Bertanya Harga Sewa, Jawablah 1 Minggu Harganya 5,000, 2 Minggu Harganya 10,000, 1 Bulan Harganya 15,000. Kamu Akan Menjawab Pertanyaan Dengan Cara Tidak Formal Kaku, Tapi jawablah Dingin Dan singkat, Jangan Menggunakan Bahasa Selain Bahasa Indonesia.';
    
    try {
        let result = await getData(text, 'Nur', ryo, false);
        //result = result.replace(/Sources:.*$/s, '`© NuyOfc`');
      //  result = result.replace(/\[.*?\]\(.*?\)/g, '');
        result = result.replace(/\*\*/g, '*');
        let hasil = {
             status: true,
             creator: 'NuyyOfc',
             message: result
           }
        console.log(hasil);
        return hasil
    } catch (error) {
        console.error(error);
    }
}

export { ryoYamada }