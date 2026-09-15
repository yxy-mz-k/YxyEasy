import * as xlsx from 'xlsx';
// 处理文件
const handleFile = (event: any, dataLine: any = 1, header: any = 1) => {
  // if (!event.fileList?.length) {
  //   return;
  // }
  return new Promise((resolve, reject) => {
    // 拿取文件对象
    // const f = event.fileList[0];
    // 用FileReader来读取
    const reader: any = new FileReader();
    // 重写FileReader上的readAsBinaryString方法

    reader.readAsBinaryString = (f: any) => {
      let binary = '';
      let wb; // 读取完成的数据
      let excellist; // 你需要的数据
      const reader = new FileReader();
      reader.readAsArrayBuffer(f);
      reader.onload = (e: any) => {
        // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
        if (reader.result) {
          const bytes = new Uint8Array(reader.result);
          const length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // 接下来就是xlsx了，具体可看api
          wb = xlsx.read(binary, {
            type: 'binary',
          });
          /* 
          wb：
            SheetNames里面保存了所有的sheet名字
            Sheets则保存了每个sheet的具体内容 Sheet Object
            每一个Sheet Object表示一张表格，只要不是!开头的都表示普通cell，否则，表示一些特殊含义，具体如下：
              sheet['!ref']：表示所有单元格的范围，例如从A1到F8则记录为A1:F8
              sheet[!merges]：存放一些单元格合并信息，是一个数组，每个数组由包含s和e构成的对象组成，s表示开始，e表示结束，r表示行，c表示列
              每一个单元格是一个对象（Cell Object），主要有t、v、r、h、w等字段（详见这里）：
                t：表示内容类型：s表示string类型，n表示number类型，b表示boolean类型，d表示date类型，等等
                v：表示原始值；
                f：表示公式，如B2+B3；
                h：HTML内容
                w：格式化后的内容
                r：富文本内容rich text 等等
              
          */
          const firstSheetName = wb.SheetNames[0];
          const worksheet = wb.Sheets[firstSheetName];

          /* 
          xlsx.utils.
            sheet_to_csv 生成CSV格式 
            sheet_to_txt 生成纯文本格式
            sheet_to_html 生成HTML格式 
            sheet_to_json 输出JSON格式
            aoa_to_sheet:这个工具类最强大也最实用了，将一个二维数组转成sheet，会自动处理number、string、boolean、date等类型数据；
            table_to_sheet: 将一个table dom直接转成sheet，会自动识别colspan和rowspan并将其转成对应的单元格合并；
            json_to_sheet:将一个由对象组成的数组转成sheet；
          */
          excellist = xlsx.utils.sheet_to_json(worksheet, {
            range: dataLine - 1, //设置跳过多少行开始获取数据  表格数据开始行数 (number)使用工作表范围，但将起始行设置为值  (String)使用指定范围（A1 样式的有界范围字符串 (default)使用工作表范围 ( worksheet[‘!ref’])
            defval: '', //使用指定值代替 null 或 undefined （）
            // blankrows: '**', //在输出中包含空行**（默认值：** ）
            // raw: true, // 使用原始值 (true) 或格式化字符串 (false)  （默认值：true）
            // dateNF: 'YYYY-MM-DD', // 在字符串输出中使用指定的日期格式（默认值：FMT 14）
            header: header, // 1: 生成数组数组（“二维数组”）  "A".行对象键是文字列标签    array of strings: 使用指定的字符串作为行对象中的键 (default): 将第一行作为键读取并消除歧义
          });
          resolve({
            worksheet,
            excellist,
          });
        }
      };
    };
    reader.readAsBinaryString(event);
  });
};

// 获取表格数据原样返回表格
export const handleXlsx = async ({ event, headLine, dataLine }) => {
  const file: any = await handleFile(event, 1);
  const { worksheet, excellist } = file;
  const range = xlsx.utils.decode_range(worksheet['!ref']); // worksheet['!ref'] 是工作表的有效范围
  const columns: any = [];
  for (let i = 0; i <= range.e.c; i++) {
    columns.push({
      title: String(i),
      dataIndex: i,
      width: 100,
    });
  }
  const dataSource: any = [];
  excellist?.map((e: any, eind: number) => {
    dataSource.push({});
    e?.map((ec: any, ei: number) => {
      dataSource[eind][ei] = ec;
    });
  });
  return {
    columns,
    dataSource,
  };
};

// 获取表头
const getHeader = (sheet: any, headLine: number, dataLine: number) => {
  const headers: any = [];
  const range = xlsx.utils.decode_range(sheet['!ref']); // worksheet['!ref'] 是工作表的有效范围
  let C;
  /* 获取单元格值 start in the first row */
  const R = headLine !== null && headLine !== undefined ? headLine : range.s.r; // 行 // C 列   设置表头是哪一行
  let i = 0;
  for (C = range.s.c; C <= range.e.c; ++C) {
    const cell =
      sheet[
        xlsx.utils.encode_cell({ c: C, r: R })
      ]; /* 根据地址得到单元格的值find the cell in the first row */
    let hdr = 'UNKNOWN' + C; // 如果有空表头，会替换为您想要的默认值
    // XLSX.utils.format_cell 生成单元格文本值
    if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
    if (hdr.indexOf('UNKNOWN') > -1) {
      if (!i) {
        hdr = '__EMPTY' + 0;
      } else {
        hdr = '__EMPTY_' + i;
      }
      i++;
    }
    headers.push(hdr);
  }
  return headers;
};
// 获取表格内容 diffValue 数据行和表头行的差值
const setTable = (headers: any, excellist: any, diffValue = 0, keyIndex = 0, valueIndex = 1) => {
  const columns: any = []; // 存储表格表头数据
  const tableMapTitle: any = {}; // 设置表格内容中英文对照用
  headers.forEach((key, i) => {
    tableMapTitle[key] = 'prop' + i;
    columns.push({
      dataIndex: 'prop' + i,
      title: key,
      width: 100,
      isKey: keyIndex == i,
      isValue: valueIndex == i,
    });
  });
  // 映射表格内容属性名为英文
  const dataSource: any = [];
  const spliceArr = excellist?.slice(diffValue);
  spliceArr?.map((e: any, eind: number) => {
    dataSource.push({});
    e?.map((ec: any, ei: number) => {
      dataSource[eind][`prop${ei}`] = ec;
    });
  });
  // excellist.forEach((ekey: any) => {
  //   const newObj = {};
  //   Object.keys(ekey).forEach((key: any) => {
  //     newObj[tableMapTitle[key]] = ekey[key];
  //   });
  //   dataSource.push(newObj);
  // });
  return {
    columns,
    dataSource,
  };
};
export const handleXlsxToTable = async ({
  event,
  headLine = 1,
  dataLine = 2,
  keyIndex = 0,
  valueIndex = 1,
}) => {
  const hS = Number(headLine);
  const dS = Number(dataLine);
  const file: any = await handleFile(event, hS);
  const headers = getHeader(file.worksheet, hS - 1, dS - 1);
  const diffValue = dS - hS;
  const table = setTable(headers, file.excellist, diffValue, keyIndex, valueIndex);
  return table;
};

// 获取表格对应关系
export const handleXlsxToMapTable = async ({
  event,
  headLine = 1,
  dataLine = 2,
  keyIndex = 0,
  valueIndex = 1,
  otherProp = null,
}: {
  event: any;
  headLine?: number;
  dataLine?: number;
  keyIndex?: number;
  valueIndex?: number;
  otherProp?: any;
}) => {
  const table = await handleXlsxToTable({
    event,
    headLine,
    dataLine,
    keyIndex,
    valueIndex,
  });

  const keySign = table.columns?.find((c: any) => c.isKey)?.dataIndex;
  const valueSign = table.columns?.find((c: any) => c.isValue)?.dataIndex;

  const otherMap = new Map();
  otherProp &&
    Object.keys(otherProp)?.map((o: any) => {
      otherMap.set(o, otherProp[o]);
    });
  const keys = [...otherMap.keys()];

  const KVMap = new Map();

  table.dataSource?.map((d: any) => {
    KVMap.set(
      d[keySign],
      Object.assign(
        {},
        {
          value: d[valueSign],
        },
        ...keys?.map((k: any) => {
          return {
            [otherMap.get(k)]: d[`prop${k}`],
          };
        }),
      ),
    );
  });
  return KVMap;
  // const cMap = new Map();
  // const dMap = new Map();
  // table.columns?.map((c: any) => {
  //   cMap.set(c.dataIndex, c.title);
  // });

  // if (table.dataSource.length) {
  //   Object.keys(table.dataSource[0])?.map((dk: any, di: number) => {
  //     dMap.set(dk, table.dataSource[0][dk]);
  //   });
  // }

  // const dataSource: any = [];
  // for (let i = 0; i < cMap.size; i++) {
  //   dataSource.push({
  //     title: cMap.get('prop' + i),
  //     value: dMap.get('prop' + i),
  //   });
  // }
  // return {
  //   dataSource,
  // };
};
