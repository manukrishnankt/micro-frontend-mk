/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export class FormValueCollection<T> {
  public formValueCollection:
    | [
        {
          sectionValues: [
            {
              sectionTabDetails?: [{ indexNumber?: number; formValue?: any }];
              sectionValues: any[];
            }
          ];
        }
      ]
    | undefined;
}
