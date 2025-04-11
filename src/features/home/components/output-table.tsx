import {
  convertLetterStringToNewOutput,
  convertToLetters,
  digitToUppercaseLetterMap,
  getBreakdownExplanation,
  getNumberLine,
} from "@/utils/rumus";

interface Result {
  input: string;
  converted: string;
  result: number;
}

export default function OutputTable({ data }: { data: Result[] }) {
  const formatExpression = (numbers: string): string =>
    numbers
      .split("")
      .map((num, idx) =>
        idx === 0 ? num : idx % 2 === 1 ? `+ ${num}` : `- ${num}`
      )
      .join(" ");

  return (
    <>
      <div>
        <h2 className="text-lg font-semibold mb-2">1. Contoh Output Angka:</h2>
        <table className="w-full table-auto border border-collapse border-gray-300 mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Sample Input</th>
              <th className="border p-2 text-left">Sample Output</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2 font-mono">{item.input}</td>
                <td className="border p-2 font-mono">
                  {item.converted.split("").join(" ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">
          2. Contoh Ekspresi dan Hasil Akhir:
        </h2>
        <table className="w-full table-auto border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Sample Input</th>
              <th className="border p-2 text-left">Ekspresi</th>
              <th className="border p-2 text-left">Hasil</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2 font-mono">{item.input}</td>
                <td className="border p-2 font-mono">
                  {formatExpression(item.converted)}
                </td>
                <td className="border p-2 font-bold">{item.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">
          3. Contoh Hasil Konversi ke Huruf:
        </h2>
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border  p-2 text-left font-bold">Sample Input</th>
              <th className="border  p-2 text-left font-bold">Explanation</th>
              <th className="border  p-2 text-left font-bold">Number Line</th>
              <th className="border  p-2 text-left font-bold">Sample Output</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              const abs = Math.abs(item.result);
              const breakdown = getBreakdownExplanation(item.result);
              const numberLine = getNumberLine(item.result);
              const letters = convertToLetters(item.result);
              return (
                <tr key={idx}>
                  <td className="border  p-2 font-mono">{item.result}</td>
                  <td className="border  p-2 font-mono">{`${
                    item.result < 0 ? `-${abs} = ` : ""
                  }${breakdown}`}</td>
                  <td className="border  p-2 font-mono">{numberLine}</td>
                  <td className="border  p-2 font-bold">{letters}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-2">
          4. Contoh Reverse Manipulasi Output ke Output Baru:
        </h2>
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left font-bold">
                Sample Input (from no. 3)
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold">
                Explanation (Find yourself)
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold">
                Sample Output
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              const letterInput = convertToLetters(item.result);
              const { explanation, sampleOutput } =
                convertLetterStringToNewOutput(letterInput);
              return (
                <tr key={idx}>
                  <td className="border border-gray-300 p-2 font-mono">
                    {letterInput}
                  </td>
                  <td className="border border-gray-300 p-2 font-mono">
                    {explanation}
                  </td>
                  <td className="border border-gray-300 p-2 font-bold">
                    {sampleOutput}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-2">
          5. Contoh Perubahan Huruf Menjadi Angka:
        </h2>
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left font-bold">
                Sample Input (from no. 4)
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold">
                Explanation (Find yourself)
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold">
                Sample Output
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              const letterInput = convertToLetters(item.result);
              const { explanation, sampleOutput } =
                convertLetterStringToNewOutput(letterInput);

              // New logic: convert final sampleOutput letters => digits
              const finalDigits = sampleOutput
                .split("")
                .map(
                  (char) =>
                    Object.entries(digitToUppercaseLetterMap).find(
                      ([, val]) => val === char
                    )?.[0] ?? ""
                )
                .join(" ");

              return (
                <tr key={idx}>
                  <td className="border border-gray-300 p-2 font-mono">
                    {sampleOutput}
                  </td>
                  <td className="border border-gray-300 p-2 font-mono">
                    {explanation}
                  </td>
                  <td className="border border-gray-300 p-2 font-bold">
                    {finalDigits}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
